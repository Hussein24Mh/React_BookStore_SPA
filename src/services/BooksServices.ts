import { loadBooksApi } from "../api";
import type { BookType, BookServiceType } from "../types";

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

export async function loadBooksCardsDataService(ids: number[] = []) {
	const books = loadBooksApi();
	return books.filter((book) => ids.length === 0 || ids.includes(book.ID)).map(mapBook);
}

export async function loadCategoriesFiltersDataService(): Promise<Record<string, number[]>> {
	const books = loadBooksApi();

	const result = books.reduce<Record<string, number[]>>((acc, book) => {
		const category = book.CATEGORY;
		const price = Number(book.PRICE);

		if (!acc[category]) {
			acc[category] = [];
		}

		acc[category].push(price);
		return acc;
	}, {});

	// sort prices within each category
	for (const category in result) {
		result[category] = result[category].sort((a, b) => a - b);
	}

	return result;
}

// load books based on category and price range
export async function loadBooksFilterService(category?: string, priceRange?: { min?: number; max?: number }) {
	const books = loadBooksApi();

	return books
		.filter((book) => {
			const price = Number(book.PRICE);
			const matchesCategory = !category || book.CATEGORY === category;
			const matchesPrice =
				(priceRange?.min === undefined || price >= priceRange.min) &&
				(priceRange?.max === undefined || price <= priceRange.max);
			return matchesCategory && matchesPrice;
		})
		.map(mapBook);
}
