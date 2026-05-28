import { getCurrentUser, getCartItemsApi } from "../api";
import { loadBooksCardsDataService } from "./BooksServices";
import type { BooksEnrichedCart } from "../types";

export function getUserDataService() {
	const userData = getCurrentUser();
	return userData;
}

export async function getUserCartDataService(): Promise<{
	enrichedCart: BooksEnrichedCart[];
	cartTotal: number;
}> {
	const cartItems = getCartItemsApi();

	if (!cartItems || cartItems.length === 0) {
		return { enrichedCart: [], cartTotal: 0 };
	}

	const cartData = await loadBooksCardsDataService(cartItems.map((item) => item.bookId));

	const enrichedCart: BooksEnrichedCart[] = cartData.map((book) => {
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
