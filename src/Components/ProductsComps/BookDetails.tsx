import type { BookServiceType } from "../../types";

interface ProductDetailsCompProps extends Partial<BookServiceType> {
	add_to_cart?: () => void;
}

export function BookDetailsComp({
	name = "",
	price = 0,
	category = "",
	img_url = "",
	description = "",
	add_to_cart = () => {},
}: Partial<ProductDetailsCompProps>) {
	return (
		<div className="relative flex flex-col md:flex-row gap-0 w-[90vw] max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-2xl">
			{/* Image Panel */}
			<div className="relative md:w-[42%] min-h-[260px] md:min-h-full flex-shrink-0 bg-slate-100 dark:bg-slate-800">
				<img src={img_url} alt={name} className="w-full h-full object-cover" />
				{/* Category badge */}
				<span className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow">
					{category}
				</span>
			</div>

			{/* Content Panel */}
			<div className="flex flex-col gap-5 p-7 md:p-9 flex-1 justify-between">
				{/* Title */}
				<div className="flex flex-col gap-3">
					<h1 className="text-2xl md:text-3xl font-bold leading-tight text-slate-900 dark:text-white tracking-tight">
						{name}
					</h1>

					{/* Divider */}
					<div className="w-12 h-1 rounded-full bg-emerald-500" />
				</div>

				{/* Description */}
				<p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-6">{description}</p>

				{/* Price + Button */}
				<div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
					<div className="flex flex-col">
						<span className="text-xs uppercase tracking-widest text-slate-400">Price</span>
						<span className="text-3xl font-extrabold text-emerald-500">£{price.toFixed(2)}</span>
					</div>
					<button
						type="button"
						onClick={add_to_cart}
						className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/25"
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
}
