// renderPage.js
export function renderPage(page) {
  // hide all pages
  document.querySelectorAll(".page").forEach((el) => {
    el.classList.add("hidden");
  });

  // show requested page
  const current = document.getElementById(page);

  if (!current) {
    document.getElementById("notfound").classList.remove("hidden");
    return;
  }

  current.classList.remove("hidden");
}