import { renderPage } from "./renderPage.js";

const routes = {
  "/": "home",
  "/product": "product",
  "/about": "about",
};

export function router() {
  alert('running')
  const hash = location.hash || "#/";
  const path = hash.replace("#", "");

  renderPage(routes[path] || "notfound");
}