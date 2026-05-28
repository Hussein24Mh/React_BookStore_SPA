import { Books } from "../data/Books";
import type { BookType } from "../types";

export function loadBooksApi(): BookType[] {
	return Books;
}

export function loadBookByIdApi(id: number): BookType | undefined {
	return Books.find((book) => book.ID === id);
}
