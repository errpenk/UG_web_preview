<?php
/**
 * Title: Ugolini journal grid
 * Slug: ugolini-group/journal-grid
 * Categories: ugolini-sections
 * Keywords: blog, recipes, journal
 */
?>
<!-- wp:group {"align":"full","className":"ugolini-section","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull ugolini-section"><!-- wp:group {"align":"wide","className":"ugolini-section-heading","layout":{"type":"default"}} --><div class="wp-block-group alignwide ugolini-section-heading"><!-- wp:group {"layout":{"type":"constrained"}} --><div class="wp-block-group"><!-- wp:paragraph {"className":"ugolini-eyebrow"} --><p class="ugolini-eyebrow">Blog e ricette</p><!-- /wp:paragraph --><!-- wp:heading --><h2 class="wp-block-heading">Alimentazione, cucina gourmet e tradizione</h2><!-- /wp:heading --></div><!-- /wp:group --><!-- wp:paragraph {"className":"ugolini-editorial-link"} --><p class="ugolini-editorial-link"><a href="/blog/">Tutti gli articoli</a></p><!-- /wp:paragraph --></div><!-- /wp:group -->
<!-- wp:query {"queryId":20,"query":{"perPage":3,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"exclude","inherit":false},"align":"wide"} --><div class="wp-block-query alignwide"><!-- wp:post-template {"className":"ugolini-journal-grid"} --><!-- wp:post-featured-image {"isLink":true} /--><!-- wp:post-terms {"term":"category"} /--><!-- wp:post-title {"isLink":true,"level":3} /--><!-- wp:post-excerpt {"moreText":"Continua a leggere"} /--><!-- /wp:post-template --></div><!-- /wp:query --></div><!-- /wp:group -->
