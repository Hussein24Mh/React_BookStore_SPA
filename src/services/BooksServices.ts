import { loadBooksApi } from "../api/booksApi";

export async function loadBooksCardsDataService(ids: number[] = []) {
	const books = loadBooksApi();
	return books
		.filter((book) => ids.length === 0 || ids.includes(book.ID))
		.map((book) => ({
			id: book.ID,
			name: book.PRODUCT_NAME,
			category: book.CATEGORY,
			img_url: book.IMG_URL,
			price: Number(book.PRICE),
		}));
}
