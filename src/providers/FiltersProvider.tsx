import { createContext, useContext, useState } from "react";
import type { BooksListFiltersType } from "../types";

interface FiltersProps {
	filters: BooksListFiltersType;
	setFilters: (filters: BooksListFiltersType) => void;
	updateFilter: <K extends keyof BooksListFiltersType>(key: K, value: BooksListFiltersType[K]) => void;
	resetFilters: () => void;
}

const defaultFilters: BooksListFiltersType = {
	category: undefined,
	minvalue: undefined,
	maxvalue: undefined,
	sortBy: undefined,
};

const FiltersContext = createContext<FiltersProps | null>(null);

export function FiltersProvider({ children }: { children: React.ReactNode }) {
	const [filters, setFilters] = useState<BooksListFiltersType>(defaultFilters);

	const updateFilter = <K extends keyof BooksListFiltersType>(key: K, value: BooksListFiltersType[K]) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const resetFilters = () => setFilters(defaultFilters);

	return (
		<FiltersContext.Provider
			value={{
				filters,
				setFilters,
				updateFilter,
				resetFilters,
			}}
		>
			{children}
		</FiltersContext.Provider>
	);
}

export function useFiltersContext() {
	const context = useContext(FiltersContext);
	if (!context) throw new Error("useFiltersContext must be used within FiltersProvider");
	return context;
}
