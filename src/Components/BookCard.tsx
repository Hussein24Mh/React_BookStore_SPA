import { ShoppingCart } from "lucide-react";

import type { BookServiceType } from "../types";

interface BookCardProp extends Partial<BookServiceType> {
	add_to_cart?: () => void;
}

export function BookCardComp({ img_url = "", name = "", price = 0, add_to_cart = () => {} }: BookCardProp) {
	return (
		<div className="group relative flex flex-col h-[350px] rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer main-divs-theme">
			<img src={img_url} alt={name} className="w-full h-60 object-cover" />
			<div className="flex flex-col flex-1 justify-between p-3">
				<h3 className="font-semibold text-sm line-clamp-2 text-center">{name}</h3>
				<div className="flex items-center justify-between mt-2 mx-2 gap-4">
					<span className="text-emerald-500 font-bold text-center">{price}</span>
				</div>
			</div>
			<button
				type="button"
				onClick={add_to_cart}
				className="absolute -top-px -left-px opacity-0 group-hover:opacity-100 transition-opacity w-0 h-0 border-t-[90px] border-r-[90px] border-t-emerald-500 border-r-transparent"
			>
				<span className="absolute top-[-72px] left-[6px] text-white flex items-center justify-center w-[24px] h-[24px] hover:text-slate-800">
					<ShoppingCart size={30} />
				</span>
			</button>
		</div>
	);
}
