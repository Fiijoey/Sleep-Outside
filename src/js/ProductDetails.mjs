//Testing testing testing

//Even more testing so I don't mess up our main </3

import { addToLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./shared";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  //     productDetailsTemplate(product){
  //         return `
  //     <section class="product-detail">
  //         <h3>${product.Brand.Name}</h3>

  //         <h2 class="divider">${product.NameWithoutBrand}</h2>

  //         <img
  //           class="divider"
  //           src="${product.Images.PrimaryLarge}"
  //           alt="${product.NameWithoutBrand}"
  //         />

  //         <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>

  //         <p class="product__color">${product.Colors[0].ColorName}</p>

  //         <p class="product__description">
  //           ${product.DescriptionHtmlSimple}
  //         </p>

  //         <div class="product-detail__add">
  //           <button id="addToCart" data-id="${product.Id}">
  //             Add to Cart
  //           </button>
  //         </div>
  //       </section>
  //       `;
  // }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
    updateCartCount(true);
  }
  addProductToCart() {
    addToLocalStorage(this.product, "so-cart");
    updateCartCount(true);
  }
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {

  //Discount flag - Rebecca
  const suggestedRetailPrice = product.SuggestedRetailPrice || 0;
  const listPrice = product.ListPrice || product.FinalPrice || 0;
  const discount = suggestedRetailPrice > 0
    ? ((suggestedRetailPrice - listPrice) / suggestedRetailPrice * 100).toFixed(0)
    : 0;

  let priceHTML = `<p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>`;
  let discountFlag = "";

  if (discount > 0) {
    priceHTML = `
  <p>
    <span>$${listPrice.toFixed(2)}</span>
  </p>`;

    discountFlag = `<span class="discounted-price">${discount}% OFF</span>`;
  }
  //

  document.querySelector("h2").textContent =
    product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const finalPrice = product.FinalPrice;
  document.querySelector("#p-price").innerHTML = priceHTML;
  if (discount > 0) {
    document.querySelector("#p-price").insertAdjacentHTML('beforeend', discountFlag);
  }
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML =
    product.DescriptionHtmlSimple;

  document.querySelector("#addToCart").dataset.id = product.Id;
}
