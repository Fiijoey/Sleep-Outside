import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h2 class="card_brand">${product.Brand.Name}</h2>
      <h3 class="card_name">${product.NameWithoutBrand}</h3>
      <p class="product-card_price">$${product.FinalPrice.toFixed(2)}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    this.list = await this.dataSource.getData(this.category);

    this.renderList();
    const titleElement = document.querySelector(".title");
    if (titleElement) {
      titleElement.textContent = this.category;
    } else {
      console.warn("Title element not found in the DOM.");
    }
  }
  renderList() {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      this.list,
      "afterbegin",
      false,
    );
  }
}
