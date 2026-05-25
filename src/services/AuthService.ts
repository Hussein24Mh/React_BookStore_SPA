// services/userStorage.ts
import type {
	CartItem,
	UserData,
	RegisterUserType,
	LoginUserType,
} from "../types/User";

import BOOKS from "../data/Books";

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

// Cart management

const updateUserCart = (newCart: CartItem[]) => {
	const currentUser = getCurrentUser();

	if (!currentUser) return;
	const users = loadUsers();
	const updatedUser = { ...currentUser, cart: newCart };
	const updated = users.map((u) =>
		u.email === currentUser.email ? updatedUser : u,
	);
	saveUsers(updated);
	saveCurrentUser(updatedUser);
};

export const addToCart = (bookId: number) => {
	const currentUser = getCurrentUser();

	if (!currentUser) return;
	const existing = currentUser.cart.find((item) => item.bookId === bookId);
	const newCart = existing
		? currentUser.cart.map((item) =>
				item.bookId === bookId
					? { ...item, quantity: item.quantity + 1 }
					: item,
			)
		: [...currentUser.cart, { bookId, quantity: 1 }];
	updateUserCart(newCart);
};

export const decreaseQuantity = (bookId: number) => {
	const currentUser = getCurrentUser();

	if (!currentUser) return;
	const newCart = currentUser.cart
		.map((item) =>
			item.bookId === bookId
				? { ...item, quantity: item.quantity - 1 }
				: item,
		)
		.filter((item) => item.quantity > 0);
	updateUserCart(newCart);
};

export const clearCart = () => {
	const currentUser = getCurrentUser();

	if (!currentUser) return;
	updateUserCart([]);
};

export const getCartItems = () => {
	const currentUser = getCurrentUser();
	return currentUser?.cart || [];
};

export const getCartTotal = () => {
	const currentUser = getCurrentUser();
	if (!currentUser) return 0;

	return parseFloat(
    currentUser.cart.reduce((total, item) => {
        const book = BOOKS.find((b) => b.ID === item.bookId);
        if (!book) return total;
        return total + parseFloat(book.PRICE.replace("£", "")) * item.quantity;
    }, 0).toFixed(2)
);
};
