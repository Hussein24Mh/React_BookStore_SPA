import { useQuery } from "@tanstack/react-query";
import type { BooksListFiltersType } from "../types";

import { loadBooksByIDService, loadBooksCategoriesService, loadBooksFilteredService } from "../services";

export function useBooksListQuery(ids: number[] = []) {
	return useQuery({
		queryKey: ["Productslist", ids],
		queryFn: () => loadBooksByIDService(ids),
		staleTime: 1000 * 60 * 5,
	});
}

export function useBooksCategoriesQuery() {
	return useQuery({
		queryKey: ["categoriesFiltersData"],
		queryFn: loadBooksCategoriesService,
		staleTime: 1000 * 60 * 10,
	});
}

export function useBooksFiltersListQuery(filters: BooksListFiltersType) {
	return useQuery({
		queryKey: ["booksByCategory", filters],
		queryFn: () => loadBooksFilteredService(filters),
		staleTime: 1000 * 60 * 5,
	});
}
