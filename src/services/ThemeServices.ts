import { loadThemeApi, saveThemeApi } from "../api";

export function loadThemeService() {
	return loadThemeApi();
}

export async function toggleThemeService() {
	const currentTheme = loadThemeApi();
	saveThemeApi(currentTheme === "light" ? "dark" : "light");
}
