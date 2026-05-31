import { useQuery } from "@tanstack/react-query";

import {
	loadBooksCardsDataService,
	loadBooksFilterService,
	loadCategoriesService,
	loadUniquePricesService,
} from "../services";

export function useBooksListQuery(ids: number[] = []) {
	return useQuery({
		queryKey: ["Productslist", ids],
		queryFn: () => loadBooksCardsDataService(ids),
		staleTime: 1000 * 60 * 5,
	});
}

export function useBooksCategoriesQuery() {
	return useQuery({
		queryKey: ["categories"],
		queryFn: loadCategoriesService,
		staleTime: 1000 * 60 * 10,
	});
}

export function useBooksUniquePricesQuery(category?: string) {
	return useQuery({
		queryKey: ["uniquePrices", category],
		queryFn: () => loadUniquePricesService(category),
		staleTime: 1000 * 60 * 10,
	});
}

export function useBooksFiltersListQuery(category?: string, priceRange?: { min?: number; max?: number }) {
	return useQuery({
		queryKey: ["booksByCategory", category, priceRange?.min, priceRange?.max],
		queryFn: () => loadBooksFilterService(category, priceRange),
		staleTime: 1000 * 60 * 5,
	});
}
