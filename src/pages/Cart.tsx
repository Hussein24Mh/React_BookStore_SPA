import CartitemComp from "../Components/Cartitem";
import BOOKS from "../data/Books";

import { useClearCartMutation } from "../mutations/useCartMutations";
import {
	useCurrentUserCart,
	useCartTotalQuery,
} from "../queries/useCurrentUserQueries";

function CartPage() {
	const { mutate: clearCartMutation } = useClearCartMutation();
	const { data: cartData = [] } = useCurrentUserCart();
	const { data: cartTotal } = useCartTotalQuery();

	return (
		<div className="flex gap-10 mx-auto my-10 items-top">
			<div className="flex flex-col gap-4 p-6 rounded h-fit secondery-divs-theme">
				{cartData.map((cartItem) => {
					const book = BOOKS.find((b) => b.ID === cartItem.bookId);
					if (!book) return null;
					return (
						<CartitemComp
							key={cartItem.bookId}
							book={book}
							quantity={cartItem.quantity}
						/>
					);
				})}
			</div>

			<div className="flex flex-col gap-4 p-6 rounded h-fit secondery-divs-theme">
				<h2 className="text-2xl font-bold py-6 px-15">Order Summary</h2>
				<div className="flex justify-between">
					<span>Total</span>
					<span className="text-emerald-600 font-bold">
						£{cartTotal}
					</span>
				</div>
				<button
					type="button"
					onClick={() => clearCartMutation()}
					className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
				>
					Place Order
				</button>
			</div>
		</div>
	);
}

export default CartPage;
