const SAVED_THEME = "marketplace_theme";

import type { Theme } from "../types/LocalStorage";

export function saveThemeApi(theme: Theme): void {
	localStorage.setItem(SAVED_THEME, theme);
}

export function loadThemeApi(): Theme {
	const savedTheme = localStorage.getItem(SAVED_THEME);

	return savedTheme === "dark" ? "dark" : "light";
}
