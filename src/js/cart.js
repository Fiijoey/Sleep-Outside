import { getLocalStorage } from "./utils.mjs";

import { setLocalStorage } from "./utils.mjs";

function removeItem(itemId){
  let storage = getLocalStorage("so-cart");
  storage.forEach(item => {
    if(item.Id === itemId){
      let index = storage.indexOf(item);
      storage.splice(index, 1);
      setLocalStorage(storage, "so-cart");
      renderCartContents();
    }
  });
}
  

function addRemoveListener(){
  let removeButtons = document.querySelectorAll(".remove-item");

for (let index = 0; index < removeButtons.length; index++) {
  let element = removeButtons[index];
  element.addEventListener("click",() =>{ removeItem(element.getAttribute("data-id"))});
  
}
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  addRemoveListener();
  
}

function cartItemTemplate(item) {
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

renderCartContents();

//addRemoveListener();

