import { useMemo } from "react";

interface PriceRangeFilterProps {
	prices: number[];
	min: number;
	max: number;
	onChange: (range: { min: number; max: number }) => void;
}

const HISTOGRAM_BARS = 16;

export function FiltersPriceRangeComp({
	prices = [],
	min = 0,
	max = 9999,
	onChange = () => {},
}: PriceRangeFilterProps) {
	const priceMin = prices[0] ?? 0;
	const priceMax = prices[prices.length - 1] ?? 9999;

	const bars = useMemo(() => {
		const step = (priceMax - priceMin) / HISTOGRAM_BARS;
		return Array.from({ length: HISTOGRAM_BARS }, (_, i) => {
			const lo = priceMin + i * step;
			const hi = lo + step;
			const count = prices.filter((p) => p >= lo && p < hi).length;
			return { lo, hi, count };
		});
	}, [prices, priceMin, priceMax]);

	const maxCount = Math.max(...bars.map((b) => b.count), 1);

	const toPercent = (val: number) => ((val - priceMin) / (priceMax - priceMin)) * 100;

	const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = Math.min(Number(e.target.value), max - 1);
		onChange({ min: val, max });
	};

	const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = Math.max(Number(e.target.value), min + 1);
		onChange({ min, max: val });
	};

	return (
		<div className="flex flex-col gap-3">
			<p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Price range</p>

			{/* Histogram */}
			<div className="flex items-end gap-[2px] h-14 w-full">
				{bars.map((bar, i) => {
					const inRange = bar.hi >= min && bar.lo <= max;
					const heightPct = (bar.count / maxCount) * 100;
					return (
						<div
							key={i}
							className="flex-1 rounded-sm transition-all duration-200"
							style={{
								height: `${Math.max(heightPct, 4)}%`,
								background: inRange
									? "var(--color-primary, #6366f1)"
									: "var(--color-border-secondary, #e2e8f0)",
								opacity: inRange ? 1 : 0.4,
							}}
							title={`$${Math.round(bar.lo)}–$${Math.round(bar.hi)}: ${bar.count} books`}
						/>
					);
				})}
			</div>

			{/* Dual-handle slider */}
			<div className="relative h-5 flex items-center">
				{/* Track background */}
				<div className="absolute w-full h-1 rounded-full bg-gray-200 dark:bg-gray-600" />

				{/* Active track fill */}
				<div
					className="absolute h-1 rounded-full transition-all duration-100"
					style={{
						left: `${toPercent(min)}%`,
						right: `${100 - toPercent(max)}%`,
						background: "var(--color-primary, #6366f1)",
					}}
				/>

				{/* Min handle */}
				<input
					type="range"
					min={priceMin}
					max={priceMax}
					step={1}
					value={min}
					onChange={handleMin}
					className="absolute w-full appearance-none bg-transparent pointer-events-none
                               [&::-webkit-slider-thumb]:pointer-events-auto
                               [&::-webkit-slider-thumb]:appearance-none
                               [&::-webkit-slider-thumb]:w-4
                               [&::-webkit-slider-thumb]:h-4
                               [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-white
                               [&::-webkit-slider-thumb]:border-2
                               [&::-webkit-slider-thumb]:border-primary
                               [&::-webkit-slider-thumb]:shadow-sm
                               [&::-webkit-slider-thumb]:cursor-grab
                               [&::-webkit-slider-thumb]:transition-transform
                               [&::-webkit-slider-thumb]:hover:scale-125"
					style={{ zIndex: min > priceMax - 10 ? 5 : 3 }}
				/>

				{/* Max handle */}
				<input
					type="range"
					min={priceMin}
					max={priceMax}
					step={1}
					value={max}
					onChange={handleMax}
					className="absolute w-full appearance-none bg-transparent pointer-events-none
                               [&::-webkit-slider-thumb]:pointer-events-auto
                               [&::-webkit-slider-thumb]:appearance-none
                               [&::-webkit-slider-thumb]:w-4
                               [&::-webkit-slider-thumb]:h-4
                               [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-white
                               [&::-webkit-slider-thumb]:border-2
                               [&::-webkit-slider-thumb]:border-primary
                               [&::-webkit-slider-thumb]:shadow-sm
                               [&::-webkit-slider-thumb]:cursor-grab
                               [&::-webkit-slider-thumb]:transition-transform
                               [&::-webkit-slider-thumb]:hover:scale-125"
					style={{ zIndex: 4 }}
				/>
			</div>

			{/* Price labels */}
			<div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
				<span>${min}</span>
				<span>${max}</span>
			</div>
		</div>
	);
}
