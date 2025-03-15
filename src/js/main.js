import ProductData from "./ProductData.mjs";

import ProductList from "./ProductList.mjs";

import { qs } from "./utils.mjs";

const element = qs(".product-list");

const dataSource = new ProductData("tents");



const productList1 = new ProductList("tents", dataSource, element);

productList1.init();

