// Centraliza todos los selectores de la UI
// Si un selector cambia, se actualiza aqui

/**
 * Selectores de la página de login
 */
export const LoginSelectors = {
  usernameField: '[data-test="username"]',
  passwordField: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]',
} as const;

/**
 * Selectores de la página de inventario (productos).
 * addToCartBtn es una función porque el selector varia según el producto.
 */

export const InventorySelectors = {
  pageTitle: ".title",
  productList: ".inventory_list",
  cartBadge: ".shopping_cart_badge",
  cartIcon: ".shopping_cart_link",
  // "Sauce Labs Backpack" → '[data-test="add-to-cart-sauce-labs-backpack"]'
  addToCartBtn: (productName: string): string =>
    `[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, "-")}"]`,
} as const;

/**
 * Selectores de la página del carrito
 */

export const CartSelectors = {
  cartItem: ".cart_item",
  itemName: ".inventory_item_name",
  checkoutButton: '[data-test="checkout"]',
  continueButton: '[data-test="continue-shopping"]',
} as const;

/**
 * Selectores de la página de checkout
 */

export const CheckoutSelectors = {
  firstNameField: '[data-test="firstName"]',
  lastNameField: '[data-test="lastName"]',
  postalCodeField: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  finishButton: '[data-test="finish"]',
  confirmationMsg: ".complete-header",
  errorMessage: '[data-test="error"]',
} as const;
