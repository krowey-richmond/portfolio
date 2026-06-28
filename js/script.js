const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");
const mainNav = document.querySelector(".main-nav");
const mobileQuery = window.matchMedia("(max-width: 768px)");
const navItems = document.querySelectorAll(".nav-links a");

const prefersReducedMotion = window.matchMedia(
	"(prefers-reduced-motion: reduce)",
).matches;

// mobile nav open/close
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

//theme toggle
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const THEME_KEY = "portfolio-theme";

function applyTheme(theme) {
	root.setAttribute("data-theme", theme);
	if (themeToggle) {
		const isLight = theme === "light";
		themeToggle.setAttribute("aria-pressed", String(isLight));
		themeToggle.setAttribute(
			"aria-label",
			isLight ? "Switch to dark mode" : "Switch to light mode",
		);
	}
}
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) {
	applyTheme(savedTheme);
} else {
	const systemPrefersLight = window.matchMedia(
		"(prefers-color-scheme: light)",
	).matches;
	applyTheme(systemPrefersLight ? "light" : "dark");
}

if (themeToggle) {
	themeToggle.addEventListener("click", function () {
		const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
		applyTheme(next);
		localStorage.setItem(THEME_KEY, next);
	});
}
