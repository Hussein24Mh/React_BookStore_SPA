interface CategoryDropdownProps {
	categories: string[] | undefined;
	pendingCategory: string | undefined;
	updatePendingCategory: (category: string | undefined) => void;
}

export const FiltersCategoryDropdown = ({
	categories,
	pendingCategory,
	updatePendingCategory,
}: CategoryDropdownProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		updatePendingCategory(value === "" ? undefined : value);
	};

	return (
		<div className="flex flex-col gap-2">
			<h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Category</h3>
			<div className="relative">
				<select
					value={pendingCategory ?? ""}
					onChange={handleChange}
					className="w-full px-3 py-2 pr-8 rounded-lg text-sm transition-colors appearance-none cursor-pointer
                        bg-white dark:bg-slate-800 
                        border border-slate-200 dark:border-slate-600 
                        text-slate-700 dark:text-slate-200
                        focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
				>
					<option value="">All categories</option>
					{(categories ?? []).map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>

				{/* dropdown arrow */}
				<div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-400">
					<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
						<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
					</svg>
				</div>
			</div>

			{/* selected badge */}
			{pendingCategory && (
				<div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
					<span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
						{pendingCategory}
					</span>
					<button
						type="button"
						onClick={() => updatePendingCategory(undefined)}
						className="text-emerald-500 hover:text-emerald-700 text-xs font-bold"
					>
						✕
					</button>
				</div>
			)}
		</div>
	);
};
