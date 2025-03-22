import { getLocalStorage } from "./utils.mjs";
import { setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./shared.js"; // Import the cart count updater
import { loadHeaderFooter } from "./utils.mjs";

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
  const updatedCartItems = Array.isArray(cartItems) ? cartItems : [cartItems];

  //const totalPrice = updatedCartItems.reduce((acc, item) => acc + (item.FinalPrice * item.quantity), 0);
  const totalPrice = updatedCartItems.reduce((acc, item) => acc + parseFloat(item.FinalPrice || 0), 0);

  const cartTotalElement = document.querySelector(".cart-total");

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  addRemoveListener();
  updateCartCount();

  if (updatedCartItems.length === 0) {
    cartTotalElement.classList.add("hidden");
  } else {
    cartTotalElement.classList.remove("hidden");
    cartTotalElement.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
  }

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

async function initCartPage() {
  await loadHeaderFooter();
  renderCartContents();
  updateCartCount();
}

initCartPage();