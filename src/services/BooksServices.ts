import { loadBooksApi } from "../api";
import type { BookType, BookServiceType, BooksListFiltersType } from "../types";

function mapBook(book: BookType): BookServiceType {
	return {
		id: book.ID,
		name: book.PRODUCT_NAME,
		category: book.CATEGORY,
		img_url: book.IMG_URL,
		price: Number(book.PRICE),
		description: book.DESCRIPTION,
	};
}

export async function loadBooksByIDService(ids: number[] = []) {
	const books = loadBooksApi();
	return books.filter((book) => ids.length === 0 || ids.includes(book.ID)).map(mapBook);
}

export async function loadBooksCategoriesService(): Promise<string[]> {
	const books = loadBooksApi();

	return [...new Set(books.map((book) => book.CATEGORY))].sort();
}

export async function loadBooksFilteredService(filters: BooksListFiltersType) {
	const books = loadBooksApi();

	const filtered = books
		.filter((book) => {
			const price = Number(book.PRICE);
			const matchesCategory = !filters.category || book.CATEGORY === filters.category;
			const matchesPrice =
				(filters.minvalue === undefined || price >= filters.minvalue) &&
				(filters.maxvalue === undefined || price <= filters.maxvalue);
			return matchesCategory && matchesPrice;
		})
		.map(mapBook);
	if (filters.sortBy === "price_asc") return filtered.sort((a, b) => a.price - b.price);
	if (filters.sortBy === "price_desc") return filtered.sort((a, b) => b.price - a.price);
	return filtered;
}
