<?php
/**
 * Title: Ugolini newsletter invitation
 * Slug: ugolini-group/newsletter
 * Categories: ugolini-sections
 * Keywords: newsletter, consent
 */
?>
<!-- wp:group {"anchor":"newsletter","align":"full","className":"ugolini-section ugolini-newsletter","layout":{"type":"constrained"}} -->
<div id="newsletter" class="wp-block-group alignfull ugolini-section ugolini-newsletter"><!-- wp:html -->
<div class="ugolini-newsletter-inner">
	<h2>Entra nel mondo Ugolini</h2>
	<p>Ricevi novità sul catalogo, ricette e appuntamenti dedicati al gusto italiano.</p>
	<form class="ugolini-newsletter-form" action="mailto:info@ugolinigroup.com" method="post" enctype="text/plain">
		<div><label><span>Nome</span><input name="nome" autocomplete="given-name" placeholder="Nome" required></label><label><span>Cognome</span><input name="cognome" autocomplete="family-name" placeholder="Cognome" required></label></div>
		<label><span>Email</span><input name="email" type="email" autocomplete="email" placeholder="Email" required></label>
		<label class="ugolini-newsletter-consent"><input type="checkbox" required> <span>Acconsento a ricevere novità e offerte Ugolini. Leggi la <a href="/privacy-policy/">Privacy Policy</a>.</span></label>
		<button type="submit">Iscriviti</button>
	</form>
</div>
<!-- /wp:html --></div><!-- /wp:group -->
