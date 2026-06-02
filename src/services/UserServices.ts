import { getCurrentUser, getCartItemsApi } from "../api";
import { loadBooksByIDService } from "./BooksServices";
import type { BooksEnrichedCartType, UserDataType } from "../types";

export function getUserDataService(): UserDataType{
	const userData = getCurrentUser();
	
	if (!userData) {
		throw new Error("No user is currently logged in");
	}

	return userData;
}

export async function getUserCartDataService(): Promise<{
	enrichedCart: BooksEnrichedCartType[];
	cartTotal: number;
}> {
	const cartItems = getCartItemsApi();

	if (!cartItems || cartItems.length === 0) {
		return { enrichedCart: [], cartTotal: 0 };
	}

	const cartData = await loadBooksByIDService(cartItems.map((item) => item.bookId));

	const enrichedCart: BooksEnrichedCartType[] = cartData.map((book) => {
		const cartItem = cartItems.find((item) => item.bookId === book.id);
		const quantity = cartItem?.quantity ?? 0;
		return {
			...book,
			quantity,
			item_total: Number((book.price * quantity).toFixed(2)),
		};
	});

	const cartTotal = Number(enrichedCart.reduce((acc, item) => acc + item.item_total, 0).toFixed(2));

	return { enrichedCart, cartTotal };
}

export async function getCartCount() {
	const cartItems = getCartItemsApi();
	return cartItems?.length ?? 0;
}
