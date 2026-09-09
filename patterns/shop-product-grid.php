<?php
/**
 * Title: Native SureCart shop catalogue
 * Slug: ugolini-group/shop-product-grid
 * Categories: ugolini-sections
 * Keywords: shop, filters, surecart
 * Inserter: no
 */
?>
<!-- wp:surecart/product-list {"query":{"perPage":20,"pages":0,"offset":0,"postType":"sc_product","order":"asc","orderBy":"menu_order","author":"","search":"","exclude":[],"include":[],"sticky":"","inherit":false,"taxQuery":null,"parents":[]},"align":"wide","className":"ugolini-product-list ugolini-shop-list","style":{"spacing":{"blockGap":"24px"}}} -->
<!-- wp:group {"className":"ugolini-shop-tools","layout":{"type":"flex","justifyContent":"right","flexWrap":"nowrap"}} --><div class="wp-block-group ugolini-shop-tools"><!-- wp:surecart/product-list-filter /--><!-- wp:surecart/product-list-sort /--></div><!-- /wp:group -->
<!-- wp:surecart/product-list-filter-tags {"layout":{"type":"flex","orientation":"vertical"}} --><!-- wp:surecart/product-list-filter-tags-template --><!-- wp:surecart/product-list-filter-tag /--><!-- /wp:surecart/product-list-filter-tags-template --><!-- /wp:surecart/product-list-filter-tags -->
<!-- wp:surecart/product-template {"className":"ugolini-product-template","style":{"spacing":{"blockGap":"30px"}},"layout":{"type":"grid","columnCount":4,"minimumColumnWidth":"220px"}} -->
<!-- wp:group {"className":"ugolini-product-card","layout":{"type":"default"}} --><div class="wp-block-group ugolini-product-card"><!-- wp:cover {"useFeaturedImage":true,"dimRatio":0,"isUserOverlayColor":true,"contentPosition":"top right","className":"ugolini-product-card-media","style":{"dimensions":{"aspectRatio":"1"}}} --><div class="wp-block-cover ugolini-product-card-media has-custom-content-position is-position-top-right"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-0 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:surecart/product-sale-badge {"style":{"border":{"radius":"0px"},"typography":{"fontSize":"11px"}}} /--></div></div><!-- /wp:cover --><!-- wp:surecart/product-collection-tags {"count":1,"className":"ugolini-product-card-meta"} --><!-- wp:surecart/product-collection-tag {"isLink":false} /--><!-- /wp:surecart/product-collection-tags --><!-- wp:surecart/product-title {"level":3,"className":"ugolini-product-card-title"} /--><!-- wp:group {"className":"ugolini-product-card-price","layout":{"type":"flex","flexWrap":"nowrap"}} --><div class="wp-block-group ugolini-product-card-price"><!-- wp:surecart/product-list-price /--><!-- wp:surecart/product-scratch-price /--></div><!-- /wp:group --></div><!-- /wp:group -->
<!-- /wp:surecart/product-template -->
<!-- wp:surecart/product-pagination {"textColor":"text","style":{"spacing":{"padding":{"top":"40px","bottom":"0px"}}}} --><!-- wp:surecart/product-pagination-previous /--><!-- wp:surecart/product-pagination-numbers /--><!-- wp:surecart/product-pagination-next /--><!-- /wp:surecart/product-pagination -->
<!-- wp:surecart/product-list-no-products --><!-- wp:paragraph {"align":"center"} --><p class="has-text-align-center">I prodotti saranno visibili qui quando verranno pubblicati.</p><!-- /wp:paragraph --><!-- /wp:surecart/product-list-no-products -->
<!-- /wp:surecart/product-list -->
