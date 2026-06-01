import { useState, useEffect } from "react";
import { useCategoriesFiltersDataQuery } from "../queries";

import { SlidersHorizontal } from "lucide-react";

interface FilterMenuFeatureProp {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	onApply: (category: string | undefined, priceRange: { min?: number; max?: number }) => void;
}

export function FilterMenuFeature({ isOpen, onOpen, onClose, onApply }: FilterMenuFeatureProp) {
	const { data: categoriesFilterData = {} as Record<string, number[]> } = useCategoriesFiltersDataQuery();

	const categories = Object.keys(categoriesFilterData);
	const firstCategory = categories[0];

	const [pendingCategory, setPendingCategory] = useState<string | undefined>(firstCategory);
	const [pendingMin, setPendingMin] = useState<number | undefined>(undefined);
	const [pendingMax, setPendingMax] = useState<number | undefined>(undefined);

	// update price range when category changes
	const pricesForCategory = pendingCategory ? (categoriesFilterData[pendingCategory] ?? []) : [];

	// set default price range when category changes
	useEffect(() => {
		if (pricesForCategory.length > 0) {
			setPendingMin(pricesForCategory[0]);
			setPendingMax(pricesForCategory[pricesForCategory.length - 1]);
		}
	}, [pendingCategory]);

	const handleApply = () => {
		onApply(pendingCategory, { min: pendingMin, max: pendingMax });
	};

	const handleReset = () => {
		setPendingCategory(undefined);
		setPendingMin(undefined);
		setPendingMax(undefined);
	};

	return (
		<>
			<button
				type="button"
				onClick={onOpen}
				className="fixed lg:hidden top-21 left-0 flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 
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
					onClick={onClose}
				/>
			)}

			<aside
				className={`
                fixed top-21 left-0 max-h-[calc(100vh-4rem)] w-72 z-30 p-6 flex flex-col gap-6
                rounded-lg secondery-divs-theme sidebar-scroll shadow-xl overflow-y-auto
                transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:sticky lg:top-21 lg:max-h-[calc(100vh-4rem)] lg:translate-x-0 lg:shadow-none
            `}
			>
				<h2 className="text-lg font-bold">Filters</h2>

				{/* categories */}
				<div className="flex flex-col gap-2">
					<h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Category</h3>
					<div className="flex flex-col gap-1">
						{categories.map((cat) => (
							<button
								key={cat}
								type="button"
								onClick={() => setPendingCategory(cat)}
								className={`text-left px-3 py-2 rounded-lg text-sm transition-colors
                                    ${
										pendingCategory === cat
											? "bg-emerald-500 text-white font-semibold"
											: "hover:bg-slate-100 dark:hover:bg-slate-700"
									}`}
							>
								{cat}
							</button>
						))}
					</div>
				</div>

				{/* price range */}
				<div className="flex flex-col gap-2">
					<h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Price Range</h3>
					<div className="flex items-center gap-2">
						<input
							type="number"
							value={pendingMin ?? ""}
							onChange={(e) => setPendingMin(Number(e.target.value))}
							placeholder="Min"
							className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm outline-none focus:border-emerald-500"
						/>
						<span className="text-slate-400">—</span>
						<input
							type="number"
							value={pendingMax ?? ""}
							onChange={(e) => setPendingMax(Number(e.target.value))}
							placeholder="Max"
							className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm outline-none focus:border-emerald-500"
						/>
					</div>
				</div>

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
						Apply
					</button>
				</div>
			</aside>
		</>
	);
}
