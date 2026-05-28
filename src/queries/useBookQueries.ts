import { useQuery } from "@tanstack/react-query";

import { loadBooksCardsDataService } from "../services";

export function useBooksListQuery(ids: number[] = []) {
	return useQuery({
		queryKey: ["Productslist", ids],
		queryFn: () => loadBooksCardsDataService(ids),
		staleTime: 1000 * 60 * 5,
	});
}
