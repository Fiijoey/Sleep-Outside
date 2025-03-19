import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs, getParam } from "./utils.mjs";
import { updateCartCount } from "./shared.js"; // Import cart count logic

const element = qs(".product-list");
const category = getParam("category");
const dataSource = new ProductData();


const productList1 = new ProductList(category, dataSource, element);

productList1.init();

// Update the cart count on page load
updateCartCount();