// src/hooks/useFiltersReducer.ts
import { useSearchParams } from "react-router-dom";
import type { BooksListFiltersType } from "../types";

// reads current URL params → returns a filters object
function parseFiltersFromParams(params: URLSearchParams): BooksListFiltersType {
	return {
		category: params.get("category") ?? undefined,
		minvalue: params.get("minvalue") ? Number(params.get("minvalue")) : undefined,
		maxvalue: params.get("maxvalue") ? Number(params.get("maxvalue")) : undefined,
		sortBy: (params.get("sortBy") as BooksListFiltersType["sortBy"]) ?? undefined,
	};
}

export function useFilters() {
	const [searchParams, setSearchParams] = useSearchParams();

	// the URL IS the state — derive filters from it
	const filters = parseFiltersFromParams(searchParams);

	// dispatch-style API — mirrors your old context exactly
	const updateFilter = <K extends keyof BooksListFiltersType>(key: K, value: BooksListFiltersType[K]) => {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			value !== undefined ? next.set(key, String(value)) : next.delete(key);
			return next;
		});
	};

	const setFilters = (newFilters: BooksListFiltersType) => {
		const next = new URLSearchParams();
		if (newFilters.category) next.set("category", newFilters.category);
		if (newFilters.minvalue) next.set("minvalue", String(newFilters.minvalue));
		if (newFilters.maxvalue) next.set("maxvalue", String(newFilters.maxvalue));
		if (newFilters.sortBy) next.set("sortBy", newFilters.sortBy);
		setSearchParams(next);
	};

	const resetFilters = () => setSearchParams({});

	return { filters, updateFilter, setFilters, resetFilters };
}
