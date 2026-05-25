import type { Book } from "../types/Book";

import {
	useAddToCartMutation,
	useDecreaseQuantityMutation,
} from "../mutations/useCartMutations";

interface Props {
	book: Book;
	quantity: number;
}

function CartitemComp({ book, quantity }: Props) {
	const { mutate: addToCart } = useAddToCartMutation();
	const { mutate: decreaseQuantity } = useDecreaseQuantityMutation();

	const itemTotal = (
		parseFloat(book.PRICE.replace("£", "")) * quantity
	).toFixed(2);

	return (
		<div className="flex h-[200px] w-[800px] rounded-xl overflow-hidden main-divs-theme">
			<img
				src={book["IMG URL"]}
				alt={book["PRODUCT NAME"]}
				className="w-[170px] h-full object-cover"
			/>
			<div className="flex flex-col flex-1 justify-between p-3">
				<div className="flex flex-col gap-3 font-semibold text-xl px-5">
					<span className="text-emerald-500 font-bold">
						{book.PRICE}
					</span>
					<h3 className="line-clamp-2">{book["PRODUCT NAME"]}</h3>
				</div>

				<div className="flex items-center justify-end mt-2 mx-2 gap-4">
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								decreaseQuantity(book.ID);
							}}
							className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 font-bold cursor-pointer"
						>
							−
						</button>
						<span className="flex items-center justify-center font-semibold w-10 h-10">
							{quantity}
						</span>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								addToCart(book.ID);
							}}
							className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 font-bold cursor-pointer"
						>
							+
						</button>
					</div>
					<span className="text-emerald-600 font-bold min-w-[150px] inline-block">
						Total Value: £{itemTotal}
					</span>
				</div>
			</div>
		</div>
	);
}

export default CartitemComp;
