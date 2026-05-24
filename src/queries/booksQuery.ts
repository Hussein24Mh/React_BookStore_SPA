import { useQuery } from "@tanstack/react-query";

import fetchBooksData from "../services/BooksService";

export const useBookQuery = (id: number) => {
	return useQuery({
		queryKey: ["Productslist", id],
		queryFn: () => fetchBooksData().find((book) => book.ID === id) ?? null,
		staleTime: 1000 * 60 * 5,
	});
};

export const useBooksQuery = () => {
	return useQuery({
		queryKey: ["Productslist"],
		queryFn: () => fetchBooksData(),
		staleTime: 1000 * 60 * 5,
	});
};
