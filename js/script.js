const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const mainNav = document.querySelector(".main-nav");
const mobileQuery = window.matchMedia("(max-width: 768px)");

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

navToggle.addEventListener("keydown", (e) => {
	if (e.key === "Enter" || e.key === " ") {
		e.preventDefault();
		navToggle.click();
	}
});
// NAV ITEM CLICK
if (navItems.length) {
	navItems.forEach((item) => {
		item.addEventListener("click", closeMenu);
	});
}

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
		const currentTheme = root.getAttribute("data-theme");
		const nextTheme = currentTheme === "light" ? "dark" : "light";

		applyTheme(next);
		localStorage.setItem(THEME_KEY, next);
	});
}

// scroll reveal
const revealElements = document.querySelectorAll(".reveal");

// Check user motion preference
const prefersReducedMotion = window.matchMedia(
	"(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion && revealElements.length > 0) {
	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target); // run once
				}
			});
		},
		{
			threshold: 0.1,
		},
	);

	// STAGGER EFFECT
	revealElements.forEach((el, index) => {
		el.style.transitionDelay = `${index * 80}ms`;
		revealObserver.observe(el);
	});
} else {
	// If reduced motion is enabled → show everything instantly
	revealElements.forEach((el) => {
		el.classList.add("is-visible");
	});
}
// get year
var yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
