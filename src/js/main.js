import { loadHeaderFooter } from "./utils.mjs";
import { initCartPage } from "./product_listing";
import Alert from "./Alert.js";

loadHeaderFooter();

Alert.displayAlerts();

initCartPage();
