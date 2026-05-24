const THEME = "marketplace_theme";

export function saveTheme(theme: "light" | "dark") {
	localStorage.setItem(THEME, theme);
}

export function loadTheme(): "light" | "dark" {
	return localStorage.getItem(THEME) === "dark" ? "dark" : "light";
}
