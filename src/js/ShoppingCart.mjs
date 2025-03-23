import { getLocalStorage } from "./utils.mjs";

function ShoppingCartTemplate(product) {
  const newProduct = `<li class="product-card">
  <a href="#">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
    loading = "lazy"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">${product.FinalPrice}</p>
  }
  </a>
</li>`;

  return newProduct;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const htmlItems = cartItems.map((item) => ShoppingCartTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
  }
}
