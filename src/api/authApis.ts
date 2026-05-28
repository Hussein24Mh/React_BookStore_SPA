import type { RegisterUserType, LoginUserType, UserDataType } from "../types";

const ALL_USERS_Key = "marketplace_users";
const CURRENT_USER_KEY = "marketplace_current_user";

export function loadUsers(): UserDataType[] {
	return JSON.parse(localStorage.getItem(ALL_USERS_Key) ?? "[]");
}

export function saveUsers(users: UserDataType[]) {
	localStorage.setItem(ALL_USERS_Key, JSON.stringify(users));
}

export function saveCurrentUser(user: UserDataType) {
	localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getCurrentUser(): UserDataType | null {
	const saved = localStorage.getItem(CURRENT_USER_KEY);
	return saved ? JSON.parse(saved) : null;
}

function removeCurrentUser() {
	localStorage.removeItem(CURRENT_USER_KEY);
}

export function registerApi(credentials: RegisterUserType) {
	const users = loadUsers();
	if (users.some((u) => u.email === credentials.email)) return { success: false, reason: "email_already_exists" };
	const newUser: UserDataType = {
		username: credentials.username,
		email: credentials.email,
		password: credentials.password,
		cart: [],
	};
	saveUsers([...users, newUser]);
	return { success: true };
}

export function loginApi(credentials: LoginUserType) {
	const users = loadUsers();
	const user = users.find((u) => u.email === credentials.email && u.password === credentials.password);
	if (!user) {
		return { success: false, reason: "invalid_credentials" };
	}
	saveCurrentUser(user);
	return { success: true, user };
}

export function logoutApi() {
	removeCurrentUser();
}
