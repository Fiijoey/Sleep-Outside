import { getLocalStorage } from "./utils.mjs";
import { setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./shared.js"; // Import the cart count updater

function removeItem(itemId) {
  // Get the stored cart items
  let storage = getLocalStorage("so-cart");
  
  // Find and remove the item by its ID
  storage.forEach(item => {
    if (item.Id === itemId) {
      let index = storage.indexOf(item);
      storage.splice(index, 1); // Remove the item
      setLocalStorage(storage, "so-cart"); // Save updated cart back to storage
      renderCartContents(); // Re-render the cart
      updateCartCount(); // Update the cart count
    }
  });
}

function addRemoveListener() {
  // Add event listeners to all "remove-item" buttons
  let removeButtons = document.querySelectorAll(".remove-item");
  
  for (let index = 0; index < removeButtons.length; index++) {
    let element = removeButtons[index];
    element.addEventListener("click", () => {
      removeItem(element.getAttribute("data-id"));
    });
  }
}

function renderCartContents() {
  // Get the items from local storage
  const cartItems = getLocalStorage("so-cart");

  // Generate HTML for each cart item
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  
  // Render the generated HTML into the product list container
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  // Add click listeners for remove buttons
  addRemoveListener();

  // Update the cart count after rendering
  updateCartCount();
}

function cartItemTemplate(item) {
  // Template for each cart item
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="remove-item" data-id ="${item.Id}">X</span>
  </li>`;

  return newItem;
}

// Initialize the cart page
renderCartContents(); // Render cart contents
updateCartCount(); // Update the cart count on initial page load
