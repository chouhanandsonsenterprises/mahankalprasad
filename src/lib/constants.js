// Business constants shared across the app
export const FREE_SHIPPING_THRESHOLD = 499;
export const STANDARD_SHIPPING_COST = 49;
export const TAX_RATE = 0.05;

export const calcShipping = (subtotal) =>
  subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;

export const calcTax = (amount) => Math.max(0, amount * TAX_RATE);
