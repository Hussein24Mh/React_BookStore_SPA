import type { UserCartType } from "../types";
import { getCurrentUser, loadUsers, saveUsers, saveCurrentUser } from "./authApis";

function updateUserCart(newCart: UserCartType[]) {
	const currentUser = getCurrentUser();
	if (!currentUser) return;

	const users = loadUsers();
	const updatedUser = { ...currentUser, cart: newCart };

	const updated_users = users.map((u) => (u.email === currentUser.email ? updatedUser : u));
	saveUsers(updated_users);
	saveCurrentUser(updatedUser);
}

export function getCartItemsApi(): UserCartType[] {
	const currentUser = getCurrentUser();
	return currentUser?.cart || [];
}

export function addToCartApi(bookId: number) {
	const current_cart = getCartItemsApi();
	const is_existing = current_cart.find((item) => item.bookId === bookId);

	const newCart = is_existing
		? current_cart.map((item) => (item.bookId === bookId ? { ...item, quantity: item.quantity + 1 } : item))
		: [...current_cart, { bookId, quantity: 1 }];

	updateUserCart(newCart);
}

export function decreaseQuantityApi(bookId: number) {
	const current_cart = getCartItemsApi();

	const newCart = current_cart
		.map((item) => (item.bookId === bookId ? { ...item, quantity: item.quantity - 1 } : item))
		.filter((item) => item.quantity > 0);

	updateUserCart(newCart);
}

export function clearCartApi() {
	const currentUser = getCurrentUser();
	if (!currentUser) return;
	updateUserCart([]);
}
