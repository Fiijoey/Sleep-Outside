//Testing testing testing

//Even more testing so I don't mess up our main </3

import { addToLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./shared.js";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  productDetailsTemplate(product) {
    return `
    <section class="product-detail">
        <h3>${product.Brand.Name}</h3>

        <h2 class="divider">${product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${product.Images.PrimaryLarge}"
          alt="${product.NameWithoutBrand}"
        />

        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>

        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">
          ${product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">
            Add to Cart
          </button>
        </div>
      </section>
      `;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails("main");

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }
  addProductToCart() {
    addToLocalStorage(this.product, "so-cart");
    updateCartCount();
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      this.productDetailsTemplate(this.product),
    );
  }
}
