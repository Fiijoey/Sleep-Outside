import { setLocalStorage, loadHeaderFooter } from "./utils.mjs";

import { initCartPage } from "./product_listing";

const success = async function () {

  const data = [];
  await setLocalStorage(data, "so-cart");

  initCartPage();
}

success();

window.addEventListener("load", () => {
  const main = document.querySelector("main");
  const message = document.createElement("h1");
  message.classList.add("success");
  message.textContent = "Your Form Was Succesfully Submitted";
  main.appendChild(message);

});