import { useQuery } from "@tanstack/react-query";

import { loadBooksCardsDataService, loadBooksFilterService, loadCategoriesFiltersDataService } from "../services";

export function useBooksListQuery(ids: number[] = []) {
	return useQuery({
		queryKey: ["Productslist", ids],
		queryFn: () => loadBooksCardsDataService(ids),
		staleTime: 1000 * 60 * 5,
	});
}

export function useCategoriesFiltersDataQuery() {
	return useQuery({
		queryKey: ["categoriesFiltersData"],
		queryFn: loadCategoriesFiltersDataService,
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
