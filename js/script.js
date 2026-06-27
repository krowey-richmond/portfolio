const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");

const mainNav = document.querySelector(".main-nav");
const mobileQuery = window.matchMedia("(max-width: 768px)");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open-menu");
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
