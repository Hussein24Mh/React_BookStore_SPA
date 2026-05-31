import { ShoppingCart, Eye } from "lucide-react";

import type { BookServiceType } from "../../types";

interface BookCardProp extends Partial<BookServiceType> {
	add_to_cart?: () => void;
	on_view_details?: () => void;
}

export function BookCardComp({
	img_url = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
	name = "Untitled Masterpiece",
	price = 4.99,
	add_to_cart = () => {},
	on_view_details = () => {},
}: BookCardProp) {
	const formattedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format(price);

	return (
		<div className="group relative flex flex-col h-[380px] w-[260px] rounded-xl overflow-hidden bg-white dark:bg-gray-800 transition-all duration-100 hover:shadow-2xl hover:-translate-y-1">
			<button
				type="button"
				onClick={on_view_details}
				className="relative h-[210px] flex-shrink-0 overflow-hidden w-full"
			>
				<img
					src={img_url}
					alt={`Cover of ${name}`}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					loading="lazy"
				/>

				<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
					<Eye className="text-white w-8 h-8" />
				</div>
			</button>

			<div id="info-div" className="flex flex-col h-[170px] flex-shrink-0 justify-between items-center p-4">
				<button type="button" onClick={on_view_details} className="h-[52px] flex items-center">
					<h1 className="text-base text-center cursor-pointer underline-offset-2 decoration-emerald-600 hover:underline line-clamp-2 h-[3rem] leading-6">
						{name}
					</h1>
				</button>

				<span className="font-bold text-emerald-600">{formattedPrice}</span>
				<button
					type="button"
					onClick={add_to_cart}
					aria-label="Add to cart"
					className="group w-full cursor-pointer py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 transition-all duration-300 hover:bg-emerald-600 hover:text-white"
				>
					<ShoppingCart size={18} />

					<span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-700 group-hover:max-w-24 group-hover:opacity-100">
						Add to Cart
					</span>
				</button>
			</div>

			{price < 20 && (
				<div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
					Bestseller
				</div>
			)}
		</div>
	);
}
