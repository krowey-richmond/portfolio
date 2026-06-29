const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const mainNav = document.querySelector(".main-nav");
const mobileQuery = window.matchMedia("(max-width: 768px)");

const exists = (el) => el !== null;

function updateNavAria() {
	if (!navToggle || !navMenu) return;

	const isOpen = navMenu.classList.contains("open-menu");

	navToggle.setAttribute("aria-expanded", String(isOpen));
	navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

function closeMenu() {
	if (!navMenu || !navToggle) return;

	navMenu.classList.remove("open-menu");
	navToggle.classList.remove("active");
	updateNavAria();
}

// NAV TOGGLE
if (navToggle && navMenu) {
	navToggle.addEventListener("click", () => {
		navMenu.classList.toggle("open-menu");
		navToggle.classList.toggle("active");
		updateNavAria();
	});
}

// NAV ITEM CLICK
navItems.forEach((item) => {
	item.addEventListener("click", closeMenu);
});

// OUTSIDE CLICK
document.addEventListener("click", (event) => {
	if (!navMenu || !navToggle) return;

	if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
		closeMenu();
	}
});

// SCROLL CLOSE
window.addEventListener("scroll", closeMenu);

// NAV LABEL
function updateNavLabel() {
	if (!mainNav) return;

	mainNav.setAttribute(
		"aria-label",
		mobileQuery.matches
			? "Main Navigation, Mobile"
			: "Main Navigation, Desktop",
	);
}

mobileQuery.addEventListener("change", () => {
	updateNavLabel();
	closeMenu();
});

updateNavLabel();

// THEME
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const THEME_KEY = "portfolio-theme";

function applyTheme(theme) {
	root.setAttribute("data-theme", theme);

	if (!themeToggle) return;

	const isLight = theme === "light";

	themeToggle.setAttribute("aria-pressed", String(isLight));
	themeToggle.setAttribute(
		"aria-label",
		isLight ? "Switch to dark mode" : "Switch to light mode",
	);
}

const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme) {
	applyTheme(savedTheme);
} else {
	const systemLight = window.matchMedia(
		"(prefers-color-scheme: light)",
	).matches;

	applyTheme(systemLight ? "light" : "dark");
}

if (themeToggle) {
	themeToggle.addEventListener("click", () => {
		const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";

		applyTheme(next);
		localStorage.setItem(THEME_KEY, next);
	});
}
