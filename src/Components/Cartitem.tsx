import type { BooksEnrichedCartType } from "../types";

interface cartitemcompProps extends Partial<BooksEnrichedCartType> {
	add_to_cart?: () => void;
	decrease_quantity?: () => void;
}

export function CartitemComp({
	img_url = "",
	name = "",
	price = 0,
	quantity = 0,
	item_total = 0,
	add_to_cart = () => {},
	decrease_quantity = () => {},
}: cartitemcompProps) {
	return (
		<div className="flex h-[200px] w-[800px] rounded-xl overflow-hidden main-divs-theme">
			<img src={img_url} alt={name} className="w-[170px] h-full object-cover" />
			<div className="flex flex-col flex-1 justify-between p-3">
				<div className="flex flex-col gap-3 font-semibold text-xl px-5">
					<span className="text-emerald-500 font-bold">{price}</span>
					<h3 className="line-clamp-2">{name}</h3>
				</div>

				<div className="flex items-center justify-end mt-2 mx-2 gap-4">
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={decrease_quantity}
							className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 font-bold cursor-pointer"
						>
							−
						</button>
						<span className="flex items-center justify-center font-semibold w-10 h-10">{quantity}</span>
						<button
							type="button"
							onClick={add_to_cart}
							className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 font-bold cursor-pointer"
						>
							+
						</button>
					</div>
					<span className="text-emerald-600 font-bold min-w-[150px] inline-block">
						Total Value: £{item_total}
					</span>
				</div>
			</div>
		</div>
	);
}
