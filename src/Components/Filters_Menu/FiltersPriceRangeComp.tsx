interface PriceRangeFilterProps {
	selectedRange: { min?: number; max?: number };
	onChange: (priceRange: { min?: number; max?: number }) => void;
}

export function FiltersPriceRangeComp({ selectedRange, onChange }: PriceRangeFilterProps) {
	return (
		<div className="flex flex-col gap-2">
			<p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Price range</p>
			<div className="flex items-center gap-2">
				<input
					type="number"
					value={selectedRange.min ?? ""}
					onChange={(e) => onChange({ ...selectedRange, min: Number(e.target.value) })}
					placeholder="Min"
					className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm outline-none focus:border-emerald-500"
				/>
				<span className="text-slate-400">—</span>
				<input
					type="number"
					value={selectedRange.max ?? ""}
					onChange={(e) => onChange({ ...selectedRange, max: Number(e.target.value) })}
					placeholder="Max"
					className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm outline-none focus:border-emerald-500"
				/>
			</div>
		</div>
	);
}
