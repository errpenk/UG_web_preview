(() => {
	const products = document.querySelector('.ugolini-products-section');
	if (!products) return;
	products.id = 'ugolini-products';
	const align = () => {
		const target = products.querySelector('.ugolini-shop-tabs') || products.querySelector('.ugolini-section-heading') || products;
		const previous = document.documentElement.style.scrollBehavior;
		document.documentElement.style.scrollBehavior = 'auto';
		scrollTo(0, scrollY + target.getBoundingClientRect().top - 92);
		requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = previous; });
	};
	if (location.hash === '#ugolini-products') {
		requestAnimationFrame(align);
		addEventListener('load', align, { once: true });
	}
})();

for (const deal of document.querySelectorAll('[data-deal-rail]')) {
	const rail = deal.querySelector('.ugolini-product-template, .preview-product-grid');
	if (!rail) continue;
	for (const card of rail.querySelectorAll('.ugolini-product-card, .preview-product-card')) {
		const media = card.querySelector('.ugolini-product-card-media, .preview-product-media');
		if (!media || card.querySelector('.ugolini-deal-thumb')) continue;
		const thumb = document.createElement('span');
		thumb.className = 'ugolini-deal-thumb';
		thumb.innerHTML = media.innerHTML;
		media.after(thumb);
	}
	const move = direction => rail.scrollBy({ left: direction * Math.max(280, rail.clientWidth * 0.8), behavior: 'smooth' });
	deal.querySelector('[data-deal-prev]')?.addEventListener('click', () => move(-1));
	deal.querySelector('[data-deal-next]')?.addEventListener('click', () => move(1));
}

(() => {
	const dialog = document.querySelector('.ugolini-search-dialog');
	const openButton = document.querySelector('.ugolini-search-open');
	const closeButton = document.querySelector('.ugolini-search-close');
	const input = document.querySelector('#ugolini-search-input');
	const form = dialog?.querySelector('[data-live-search]');
	const results = dialog?.querySelector('.ugolini-live-search');
	if (!dialog || !openButton || !closeButton || !form) return;
	// Keep the fixed overlay outside the blurred/sticky header's containing block.
	document.body.append(dialog);
	let previousFocus;
	let searchTimer;
	let request;
	function setOpen(open) {
		if (open) previousFocus = document.activeElement;
		dialog.hidden = !open;
		openButton.setAttribute('aria-expanded', String(open));
		document.body.classList.toggle('has-search-open', open);
		(open ? input : previousFocus)?.focus();
	}
	openButton.addEventListener('click', () => setOpen(true));
	closeButton.addEventListener('click', () => setOpen(false));
	dialog.addEventListener('click', event => { if (event.target === dialog) setOpen(false); });
	dialog.addEventListener('keydown', event => {
		if (event.key === 'Escape') setOpen(false);
		if (event.key !== 'Tab') return;
		const focusable = [...dialog.querySelectorAll('button, input, [href], [tabindex]:not([tabindex="-1"])')];
		const first = focusable[0], last = focusable.at(-1);
		if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
		else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
	});
	input?.addEventListener('input', () => {
		clearTimeout(searchTimer);
		request?.abort();
		const query = input.value.trim();
		if (!results) return;
		if (!query) { results.hidden = true; results.replaceChildren(); return; }
		if (query.length < 2) { results.hidden = false; results.textContent = 'Inserisci almeno due caratteri.'; return; }
		results.hidden = false;
		results.textContent = 'Ricerca in corso…';
		searchTimer = setTimeout(async () => {
			request = new AbortController();
			try {
				const url = new URL(form.dataset.searchEndpoint, location.origin);
				url.searchParams.set('s', query);
				const response = await fetch(url, { signal: request.signal, headers: { Accept: 'application/json' } });
				if (!response.ok) throw new Error('Search request failed');
				const items = await response.json();
				if (!items.length) { results.textContent = 'Nessun risultato trovato.'; return; }
				const list = document.createElement('ul');
				for (const item of items) {
					const link = document.createElement('a');
					link.href = item.url;
					const type = document.createElement('small');
					type.textContent = item.type;
					const title = document.createElement('span');
					title.textContent = item.title;
					link.append(type, title);
					const row = document.createElement('li');
					row.append(link);
					list.append(row);
				}
				results.replaceChildren(list);
			} catch (error) {
				if (error.name !== 'AbortError') results.textContent = 'La ricerca non è disponibile. Premi Cerca per continuare.';
			}
		}, 180);
	});
})();

(() => {
	for (const showcase of document.querySelectorAll('[data-showcase]')) {
		const image = showcase.querySelector('[data-showcase-image]');
		const title = showcase.querySelector('[data-showcase-title]');
		const description = showcase.querySelector('[data-showcase-description]');
		const link = showcase.querySelector('[data-showcase-link]');
		const tabs = [...showcase.querySelectorAll('[data-showcase-tab]')];
		if (!image || !title || !description || !link || !tabs.length) continue;

		for (const tab of tabs) tab.addEventListener('click', () => {
			for (const item of tabs) item.setAttribute('aria-selected', String(item === tab));
			showcase.classList.add('is-changing');
			image.addEventListener('load', () => showcase.classList.remove('is-changing'), { once: true });
			image.src = tab.dataset.image;
			image.alt = tab.dataset.alt;
			title.textContent = tab.dataset.title;
			description.textContent = tab.dataset.description;
			link.href = tab.dataset.href;
		});
	}
})();

for (const detail of document.querySelectorAll('.ugolini-product-fact')) detail.open = true;

(() => {
	const cards = [...document.querySelectorAll('.ugolini-journal-grid > .wp-block-post')];
	const script = [...document.scripts].find(item => item.src.includes('/assets/js/theme.js'));
	if (!cards.length || !script) return;
	fetch(new URL('../../data/blog-posts.json', script.src))
		.then(response => response.ok ? response.json() : [])
		.then(articles => {
			const bySlug = new Map(articles.map(article => [article.slug, article.content]));
			for (const card of cards) {
				const link = card.querySelector('.wp-block-post-title a, .wp-block-post-featured-image a');
				const excerpt = card.querySelector('.wp-block-post-excerpt__excerpt');
				if (!link || !excerpt) continue;
				const slug = new URL(link.href, location.href).pathname.split('/').filter(Boolean).at(-1);
				const html = bySlug.get(slug);
				if (!html) continue;
				const documentCopy = new DOMParser().parseFromString(html, 'text/html').body.textContent.replace(/\s+/g, ' ').trim();
				excerpt.textContent = `${documentCopy.split(' ').slice(0, 32).join(' ')}…`;
			}
		})
		.catch(() => {});
})();

for (const gallery of document.querySelectorAll('.ugolini-product-gallery .sc-image-slider')) {
	const stage = gallery.querySelector(':scope > .swiper');
	if (!stage || gallery.querySelector('.ugolini-gallery-count')) continue;
	const count = document.createElement('span');
	count.className = 'ugolini-gallery-count';
	count.setAttribute('aria-live', 'polite');
	gallery.append(count);
	const update = () => {
		const slides = [...stage.querySelectorAll(':scope > .swiper-wrapper > .swiper-slide')].filter(slide => getComputedStyle(slide).display !== 'none');
		const active = Math.max(0, slides.findIndex(slide => slide.classList.contains('swiper-slide-active')));
		count.textContent = `${active + 1} / ${Math.max(1, slides.length)}`;
	};
	new MutationObserver(update).observe(stage, { subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
	gallery.addEventListener('click', () => requestAnimationFrame(update));
	update();
}

for (const testimonials of document.querySelectorAll('[data-testimonials]')) {
	const rail = testimonials.querySelector('[data-testimonials-rail]');
	const move = direction => {
		const atStart = rail.scrollLeft < 2;
		const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
		const left = direction < 0 && atStart ? rail.scrollWidth : direction > 0 && atEnd ? 0 : rail.scrollLeft + direction * rail.clientWidth;
		rail.scrollTo({ left, behavior: 'smooth' });
	};
	testimonials.querySelector('[data-testimonials-prev]')?.addEventListener('click', () => move(-1));
	testimonials.querySelector('[data-testimonials-next]')?.addEventListener('click', () => move(1));
}

(() => {
	const button = document.createElement('button');
	button.className = 'ugolini-scroll-top';
	button.type = 'button';
	button.setAttribute('aria-label', 'Torna all\u2019inizio');
	button.innerHTML = '<svg class="lucide lucide-arrow-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>';
	button.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
	const update = () => button.classList.toggle('is-visible', scrollY > 600);
	document.body.append(button);
	addEventListener('scroll', update, { passive: true });
	update();
})();

for (const timeline of document.querySelectorAll('[data-timeline]')) {
	const update = () => {
		const bounds = timeline.getBoundingClientRect();
		const progress = Math.max(0, Math.min(1, (innerHeight * 0.55 - bounds.top) / Math.max(1, bounds.height - innerHeight * 0.45)));
		timeline.style.setProperty('--timeline-progress', `${progress * 100}%`);
	};
	addEventListener('scroll', update, { passive: true });
	addEventListener('resize', update, { passive: true });
	update();
}

(() => {
	const panes = [...document.querySelectorAll('.ugolini-faq-section > :first-child, .ugolini-product-information .alignwide > .ugolini-eyebrow')];
	if (!panes.length) return;
	let frame;
	const update = () => {
		frame = 0;
		for (const pane of panes) {
			const peer = pane.nextElementSibling;
			const section = pane.parentElement;
			if (!peer || !section) continue;
			const children = [...pane.children];
			const paneCopyHeight = children.length ? children.at(-1).getBoundingClientRect().bottom - children[0].getBoundingClientRect().top : parseFloat(getComputedStyle(pane).lineHeight) || 24;
			const styles = getComputedStyle(pane);
			const stickyTop = parseFloat(styles.top) || 0;
			const imageGap = Math.max(24, Math.min(48, innerWidth * 0.03));
			const peerHeight = peer.getBoundingClientRect().height;
			const availableHeight = innerHeight - stickyTop - paneCopyHeight - imageGap - 24;
			const imageHeightValue = Math.max(160, Math.min(availableHeight, (peerHeight - paneCopyHeight - imageGap) / 2));
			const imageHeight = `${imageHeightValue}px`;
			if (pane.style.getPropertyValue('--ugolini-sticky-image-height') !== imageHeight) pane.style.setProperty('--ugolini-sticky-image-height', imageHeight);
			const bounds = section.getBoundingClientRect();
			const travel = Math.max(imageHeightValue, bounds.height - paneCopyHeight - imageGap - imageHeightValue);
			const revealStart = Math.max(0, travel - imageHeightValue);
			const revealed = Math.max(0, Math.min(imageHeightValue, stickyTop - bounds.top - revealStart));
			pane.style.setProperty('--ugolini-sticky-image-clip', `${imageHeightValue - revealed}px`);
		}
	};
	const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
	addEventListener('scroll', requestUpdate, { passive: true });
	addEventListener('resize', requestUpdate, { passive: true });
	const observer = new ResizeObserver(requestUpdate);
	for (const pane of panes) if (pane.nextElementSibling) observer.observe(pane.nextElementSibling);
	update();
})();
