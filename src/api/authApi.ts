import type {
	RegisterUserType,
	LoginUserType,
	UserDataType,
	UserCartType,
} from "../types/Auth";

const ALL_USERS_Key = "marketplace_users";
const CURRENT_USER_KEY = "marketplace_current_user";

function loadUsers(): UserDataType[] {
	return JSON.parse(localStorage.getItem(ALL_USERS_Key) ?? "[]");
}

function saveUsers(users: UserDataType[]) {
	localStorage.setItem(ALL_USERS_Key, JSON.stringify(users));
}

function saveCurrentUser(user: UserDataType) {
	localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getCurrentUser(): UserDataType | null {
	const saved = localStorage.getItem(CURRENT_USER_KEY);
	return saved ? JSON.parse(saved) : null;
}

function removeCurrentUser() {
	localStorage.removeItem(CURRENT_USER_KEY);
}

function updateUserCart(newCart: UserCartType[]) {
	const currentUser = getCurrentUser();
	if (!currentUser) return;

	const users = loadUsers();
	const updatedUser = { ...currentUser, cart: newCart };

	const updated_users = users.map((u) =>
		u.email === currentUser.email ? updatedUser : u,
	);
	saveUsers(updated_users);
	saveCurrentUser(updatedUser);
}

export function registerApi(credentials: RegisterUserType) {
	const users = loadUsers();
	if (users.some((u) => u.email === credentials.email))
		return { success: false, reason: "email_already_exists" };
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
	const user = users.find(
		(u) =>
			u.email === credentials.email &&
			u.password === credentials.password,
	);
	if (!user) {
		return { success: false, reason: "invalid_credentials" };
	}
	saveCurrentUser(user);
	return { success: true, user };
}

export function logoutApi() {
	removeCurrentUser();
}

// Cart management

export function getCartItemsApi(): UserCartType[] {
	const currentUser = getCurrentUser();
	return currentUser?.cart || [];
}

export function addToCartApi(bookId: number) {
	const current_cart = getCartItemsApi();
	const is_existing = current_cart.find((item) => item.bookId === bookId);

	const newCart = is_existing
		? current_cart.map((item) =>
				item.bookId === bookId
					? { ...item, quantity: item.quantity + 1 }
					: item,
			)
		: [...current_cart, { bookId, quantity: 1 }];

	updateUserCart(newCart);
}

export function decreaseQuantityApi(bookId: number) {
	const current_cart = getCartItemsApi();

	const newCart = current_cart
		.map((item) =>
			item.bookId === bookId
				? { ...item, quantity: item.quantity - 1 }
				: item,
		)
		.filter((item) => item.quantity > 0);

	updateUserCart(newCart);
}

export function clearCartApi() {
	const currentUser = getCurrentUser();
	if (!currentUser) return;
	updateUserCart([]);
}
