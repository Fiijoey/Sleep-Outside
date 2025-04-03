import { getLocalStorage } from "./utils.mjs";
import { setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./shared.js"; // Import the cart count updater
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function removeItem(itemId) {
  // Get the stored cart items
  let storage = getLocalStorage("so-cart");

  // Find and remove the item by its ID
  storage.forEach((item) => {
    if (item.Id === itemId) {
      let index = storage.indexOf(item);
      storage.splice(index, 1); // Remove the item
      setLocalStorage(storage, "so-cart"); // Save updated cart back to storage
      renderCartContents(); // Re-render the cart
      updateCartCount(true); // Update the cart count
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

function updateQuantity(itemId, change) {
  let storage = getLocalStorage("so-cart");
  storage.forEach((item) => {
    if (item.Id === itemId) {
      // Update quantity ensuring a minimum of 1
      item.quantity = Math.max((item.quantity || 1) + change, 1);
    }
  });
  setLocalStorage(storage, "so-cart");
  renderCartContents();
  updateCartCount(true);
}

function addQuantityListeners() {
  const increaseButtons = document.querySelectorAll(".increase-qty");
  const decreaseButtons = document.querySelectorAll(".decrease-qty");

  increaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-id");
      updateQuantity(itemId, 1);
    });
  });

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-id");
      updateQuantity(itemId, -1);
    });
  });
}

function renderCartContents() {
  // Get the items from local storage
  const cartItems = getLocalStorage("so-cart");
  const updatedCartItems = Array.isArray(cartItems) ? cartItems : [cartItems];

  //const totalPrice = updatedCartItems.reduce((acc, item) => acc + (item.FinalPrice * item.quantity), 0);
  const totalPrice = updatedCartItems.reduce(
    (acc, item) => acc + parseFloat(item.FinalPrice * item.quantity || 0),
    0,
  );

  const cartTotalElement = document.querySelector(".cart-total");

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  addRemoveListener();
  addQuantityListeners();
  updateCartCount(true);

  if (updatedCartItems.length === 0) {
    cartTotalElement.classList.add("hidden");
  } else {
    cartTotalElement.classList.remove("hidden");
    cartTotalElement.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
  }
}

function cartItemTemplate(item) {
  // Template for each cart item
  let quantity = 0;
  if (item.quantity === undefined) {
    quantity = 1;
  } else {
    quantity = item.quantity;
  }
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="cart-card__quantity">
      <button class="decrease-qty" data-id="${item.Id}">-</button>
      <span class="qty-value">${quantity}</span>
      <button class="increase-qty" data-id="${item.Id}">+</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice * quantity}</p>
    <span class="remove-item" data-id ="${item.Id}">X</span>
  </li>`;

  return newItem;
}

document.getElementById("checkout-btn").addEventListener("click", function () {
  window.location.href = "../checkout/index.html";
});

// Initialize the cart page
renderCartContents(); // Render cart contents
updateCartCount(true); // Update the cart count on initial page load
