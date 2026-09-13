import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const php = read('functions.php');
const header = read('assets/css/header.css');
const footer = read('assets/css/footer.css');
const surecart = read('assets/css/surecart.css');
const script = read('assets/js/theme.js');
const collectionTemplate = read('templates/taxonomy-sc_collection.html');

assert.match(php, /\[ugolini_events context="home"\].+ugolini_group_events_shortcode/);
assert.match(php, /class="ugolini-commerce-actions"/);
assert.ok(php.includes("preg_replace( '/>\\s+</'"));
assert.ok(php.includes("preg_replace( '/<div(\\s+class=\"sc-cart-icon\""));
assert.match(php, /render_block_core\/shortcode.+ugolini_group_render_header_shortcode/s);
assert.match(header, /\.ugolini-header-actions > :is\(p, \.ugolini-search-action, \.ugolini-commerce-actions\) \{ display: contents; \}/);
assert.match(header, /\.has-overlay-header \.wp-site-blocks > header\.wp-block-template-part \{ position: fixed !important;/);
assert.match(header, /\.has-overlay-header:not\(\.is-scrolled\):not\(\.is-header-engaged\) \.ugolini-site-header/);
assert.match(footer, /\.wp-block-site-logo:has\(img\) \+ \.wp-block-site-title/);
assert.doesNotMatch(footer, /\.ugolini-footer-brand a,/);
assert.match(surecart, /\.wp-block-surecart-cart-icon \{ display: none !important; \}/);
assert.match(script, /firstSection\?\.querySelector\(':scope > :first-child:is\(/);
assert.match(script, /shop\|products\?\|collections\?\|prodotto/);
assert.doesNotMatch(script, /sessionStorage\.setItem\('ugolini-nav-from'/);
assert.doesNotMatch(script, /createElement\('span'\).*ugolini-nav-indicator/s);
assert.doesNotMatch(header, /\.ugolini-nav-indicator/);
assert.match(script, /removeAttribute\('aria-current'\)/);
assert.match(collectionTemplate, /ugolini-group\/professional-assurances/);

console.log('Theme regression checks passed.');
