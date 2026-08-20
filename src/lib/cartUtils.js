// Shared cart helpers so any component can read the cart count and
// announce changes without importing/duplicating logic everywhere.

export const CART_UPDATED_EVENT = "cart-updated";

export const getCartItems = () => {
    return JSON.parse(localStorage.getItem("carts")) || [];
};

export const getCartCount = () => {
    return getCartItems().length;
};

// call this any time localStorage's "carts" key is written to (add,
// delete, clear on checkout) so every listening component re-reads it
export const notifyCartUpdated = () => {
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
};