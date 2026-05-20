import { useState, useEffect } from "react";
import type { Book } from "../types/Book";
import BOOKS from "../data/Books";

function useBooks() {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// swap this block with a fetch() call later — nothing else changes
		setBooks(BOOKS);
		setLoading(false);
	}, []);

	return { books, loading };
}

export default useBooks;
