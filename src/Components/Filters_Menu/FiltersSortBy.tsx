interface SortByProps {
	pendingSortBy: "price_asc" | "price_desc" | undefined;
	updatePendingSortBy: (sortBy: "price_asc" | "price_desc" | undefined) => void;
}

export function FiltersSortByComp({ pendingSortBy, updatePendingSortBy }: SortByProps) {
	return (
		<div className="flex flex-col gap-2">
			<h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Sort by</h3>
			<div className="flex flex-col gap-1">
				{[
					{ label: "Price: Low to High", value: "price_asc" },
					{ label: "Price: High to Low", value: "price_desc" },
				].map((option) => (
					<button
						key={option.value}
						type="button"
						onClick={() =>
							updatePendingSortBy(
								pendingSortBy === option.value
									? undefined
									: (option.value as "price_asc" | "price_desc"),
							)
						}
						className={`text-left px-3 py-2 rounded-lg text-sm transition-colors
                            ${
								pendingSortBy === option.value
									? "bg-emerald-500 text-white font-semibold"
									: "hover:bg-slate-100 dark:hover:bg-slate-700"
							}`}
					>
						{option.label}
					</button>
				))}
			</div>
		</div>
	);
}
