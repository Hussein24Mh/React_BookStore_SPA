import { loadBooksApi } from "../api";
import type { BookServiceType } from "../types";

export async function loadBooksCardsDataService(ids: number[] = []) {
	const books = loadBooksApi();
	return books
		.filter((book) => ids.length === 0 || ids.includes(book.ID))
		.map(
			(book): BookServiceType => ({
				id: book.ID,
				name: book.PRODUCT_NAME,
				category: book.CATEGORY,
				img_url: book.IMG_URL,
				price: Number(book.PRICE),
				description: book.DESCRIPTION,
			}),
		);
}
