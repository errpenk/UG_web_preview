# SureCart 4.6.6 visual validation checklist

The theme uses supported SureCart custom properties plus public block hosts. It
does not target undocumented Shadow DOM internals.

Validate these public hosts on staging after the theme is activated:

- `.wp-block-surecart-product-list`
- `.wp-block-surecart-product-template`
- `.wp-block-surecart-product-quick-view-button`
- `.wp-block-surecart-product-sale-badge`
- `.wp-block-surecart-product-page`
- `.wp-block-surecart-product-media`
- `.wp-block-surecart-product-buy-buttons`
- `.wp-block-surecart-product-quantity-input`
- `.wp-block-surecart-product-quantity-control`
- `.wp-block-surecart-cart-menu-icon-button`
- `.wp-block-surecart-cart-icon`
- `.wp-block-surecart-cart`
- `.wp-block-surecart-slide-out-cart`
- `.wp-block-surecart-cart-line-item`
- `.wp-block-surecart-checkout`
- `.surecart-checkout-form`
- `.surecart-dashboard`
- `.sc-customer-dashboard`
- `.surecart-purchase-confirmation`
- `sc-product-list`, `sc-product-page`, `sc-cart`, `sc-checkout`,
  `sc-customer-dashboard` public host elements

Also verify the supported `--sc-*` color, focus, input, radius, typography and
button variables declared in `assets/css/surecart.css` against the connected
store's checkout, slide-out cart and customer dashboard.
