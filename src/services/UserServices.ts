import * as authapis from "../api/authApi";
import { loadBooksCardsDataService } from "./BooksServices";


export function getUserDataService() {
	const userData = authapis.getCurrentUser();
	return userData;
}


export async function getUserCartDataService() {
	const cartItems = authapis.getCartItemsApi();
	const cartData = await loadBooksCardsDataService(
		cartItems.map((item) => item.bookId),
	);

	const enrichedCart = cartData.map((book) => {
		const cartItem = cartItems.find((item) => item.bookId === book.id);
		const quantity = cartItem?.quantity ?? 0;
		return {
			...book,
			quantity,
			total: book.price * quantity,
		};
	});

	const cartTotal = enrichedCart.reduce((acc, item) => acc + item.total, 0);

	return { enrichedCart, cartTotal };
}
