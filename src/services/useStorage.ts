// services/userStorage.ts
import type { User } from "../types/User";

const STORAGE_KEY = "marketplace_users";
const CURRENT_USER_KEY = "marketplace_current_user";
const THEME = "marketplace_theme";

export function saveCurrentUser(user: User) {
	localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getCurrentUser(): User | null {
	const saved = localStorage.getItem(CURRENT_USER_KEY);
	return saved ? JSON.parse(saved) : null;
}

export function removeCurrentUser() {
	localStorage.removeItem(CURRENT_USER_KEY);
}

export function loadUsers(): User[] {
	return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
}

export function saveUsers(users: User[]) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function saveTheme(theme: "light" | "dark") {
	localStorage.setItem(THEME, theme);
}

export function loadTheme(): "light" | "dark" {
	return localStorage.getItem(THEME) === "dark" ? "dark" : "light";
}

export { CURRENT_USER_KEY };
