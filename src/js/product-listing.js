import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs, getParam } from "./utils.mjs";

import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();
const element = qs(".product-list");
const category = getParam("category");
const dataSource = new ProductData();


const productList1 = new ProductList(category, dataSource, element);

productList1.init();

