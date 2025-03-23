import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./shared.js";

async function initCartPage() {
    await loadHeaderFooter();
    updateCartCount();
}

initCartPage();