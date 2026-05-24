// services/userStorage.ts
import type { UserData, RegisterUserType, LoginUserType } from "../types/User";

const STORAGE_KEY = "marketplace_users";
const CURRENT_USER_KEY = "marketplace_current_user";

export function getCurrentUser(): UserData | null {
	const saved = localStorage.getItem(CURRENT_USER_KEY);
	return saved ? JSON.parse(saved) : null;
}

export function saveCurrentUser(user: UserData) {
	localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function removeCurrentUser() {
	localStorage.removeItem(CURRENT_USER_KEY);
}

export function loadUsers(): UserData[] {
	return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
}

export function saveUsers(users: UserData[]) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export const login = (loginData: LoginUserType): boolean => {
	const { email, password } = loginData;

	const users = loadUsers();
	const found = users.find(
		(u) => u.email === email && u.password === password,
	);
	if (!found) return false;
	saveCurrentUser(found);
	return true;
};

export const register = (registerData: RegisterUserType): boolean => {
	const { username, email, password } = registerData;
	const users = loadUsers();
	if (users.some((u) => u.email === email)) return false;
	const newUser: UserData = { username, email, password, cart: [] };
	saveUsers([...users, newUser]);
	return true;
};

export const logout = () => {
	removeCurrentUser();
};
