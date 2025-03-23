import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam } from "./utils.mjs";
import { updateCartCount } from "./shared.js"; // Import cart count logic
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();
const dataSource = new ProductData("tents");
const productId = getParam("product");



const product = new ProductDetails(productId, dataSource);

window.addEventListener("load", () => {
    
    product.init();
  });



// Update the cart count on page load
//updateCartCount();
