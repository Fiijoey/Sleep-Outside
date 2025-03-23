import { getLocalStorage } from "./utils.mjs";

export function updateCartCount(loaded) {

  if(loaded){
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCountElement = document.querySelector(".cart-count");

  if (cartCountElement) {
    const count = cartItems.length;

    if (count > 0) {
      cartCountElement.textContent = count; // Update the number
      cartCountElement.style.display = "block"; // Show the cart count
    } else {
      cartCountElement.style.display = "none"; // Hide the cart count if the cart is empty
    }
  }
}
}
