import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { useFilters } from "../hooks";

import { useBooksCategoriesQuery } from "../queries";

import { FiltersPriceRangeComp, FiltersCategoryDropdown, FiltersSortByComp } from "../Components";

interface FilterMenuFeatureProp {
	isOpen: boolean;
	setFilterMenuOn: () => void;
	setFilterMenuOff: () => void;
}

export function FilterMenuFeature({ isOpen, setFilterMenuOn, setFilterMenuOff }: FilterMenuFeatureProp) {
	const { data: categories } = useBooksCategoriesQuery();

	const { filters, setFilters, resetFilters, updateFilter } = useFilters();

	// pending state — local to the menu until user clicks Search
	const [pendingCategory, setPendingCategory] = useState<string | undefined>(filters.category);
	const [pendingPriceRange, setPendingPriceRange] = useState<{ min?: number; max?: number }>({
		min: filters.minvalue,
		max: filters.maxvalue,
	});

	const handleApply = () => {
		setFilters({
			...filters,
			category: pendingCategory,
			minvalue: pendingPriceRange.min,
			maxvalue: pendingPriceRange.max,
		});
		setFilterMenuOff();
	};

	const handleReset = () => {
		resetFilters();
		setPendingCategory(undefined);
		setPendingPriceRange({});
	};

	return (
		<>
			<button
				type="button"
				onClick={setFilterMenuOn}
				className="fixed lg:hidden z-30 top-20 left-0 flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 
								dark:border-gray-700 text-sm font-medium shadow-sm bg-white dark:bg-gray-800 
								hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
			>
				<SlidersHorizontal size={16} />
				Filters
			</button>

			{/* Mobile backdrop */}
			{isOpen && (
				<button
					type="button"
					aria-label="Close filters"
					className="fixed inset-0 bg-black/40 z-20 lg:hidden backdrop-blur-sm cursor-default"
					onClick={setFilterMenuOff}
				/>
			)}

			<aside
				className={`
                fixed top-20 left-0 max-h-[calc(100vh-4rem)] w-72 z-30 p-6 flex flex-col gap-6
                rounded-lg secondery-divs-theme sidebar-scroll shadow-xl overflow-y-auto
                transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:sticky lg:top-20 lg:max-h-[calc(100vh-4rem)] lg:translate-x-0 lg:shadow-none
            `}
			>
				<FiltersSortByComp
					pendingSortBy={filters.sortBy}
					updatePendingSortBy={(sortBy) => updateFilter("sortBy", sortBy)}
				/>

				<h2 className="text-lg font-bold">Filters</h2>

				<FiltersCategoryDropdown
					categories={categories}
					pendingCategory={pendingCategory}
					updatePendingCategory={setPendingCategory}
				/>

				<FiltersPriceRangeComp selectedRange={pendingPriceRange} onChange={setPendingPriceRange} />

				{/* apply / reset buttons */}
				<div className="flex gap-3">
					<button
						type="button"
						onClick={handleReset}
						className="flex-1 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
					>
						Reset
					</button>
					<button
						type="button"
						onClick={handleApply}
						className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
					>
						Search
					</button>
				</div>
			</aside>
		</>
	);
}
