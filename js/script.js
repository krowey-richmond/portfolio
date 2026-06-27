const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");

const mainNav = document.querySelector(".main-nav");
const mobileQuery = window.matchMedia("(max-width: 768px)");

const navItems = document.querySelectorAll(".nav-links a");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open-menu");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navMenu.classList.remove("open-menu");
  });
});

document.addEventListener("click", (event) => {
  if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
    navMenu.classList.remove("open-menu");
  }
});

window.addEventListener("scroll", () => {
  navMenu.classList.remove("open-menu");
});
function updateNavLabel() {
  mainNav.setAttribute(
    "aria-label",
    mobileQuery.matches
      ? "Main Navigation, Mobile"
      : "Main Navigation, Desktop",
  );
}

mobileQuery.addListener(updateNavLabel);
updateNavLabel();
