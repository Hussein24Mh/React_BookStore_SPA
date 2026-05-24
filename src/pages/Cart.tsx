import { useAuthContext } from "../providers/AuthProvider";
import Cartitem from "../Components/Cartitem";
import BOOKS from "../data/Books";

function CartPage() {
	const { clearCart, currentUser } = useAuthContext();

	const cartItems = currentUser?.cart || [];

	const cartBooks = cartItems
		.map((item) => {
			const book = BOOKS.find((b) => b.ID === item.bookId);
			return book ? { book, quantity: item.quantity } : null;
		})
		.filter(Boolean);

	const total = cartBooks.reduce((sum, quantity) => {
		return (
			sum +
			parseFloat(quantity!.book.PRICE.replace("£", "")) *
				quantity!.quantity
		);
	}, 0);

	return (
		<div className="flex gap-10 mx-auto my-10 items-top">
			<div className="flex flex-col gap-4 p-6 rounded h-fit secondery-divs-theme">
				{cartBooks.map((entry) => (
					<Cartitem
						key={entry!.book.ID}
						book={entry!.book}
						quantity={entry!.quantity}
					/>
				))}
			</div>

			<div className="flex flex-col gap-4 p-6 rounded h-fit secondery-divs-theme">
				<h2 className="text-2xl font-bold py-6 px-15">Order Summary</h2>
				<div className="flex justify-between">
					<span>Total</span>
					<span className="text-emerald-600 font-bold">
						£{total.toFixed(2)}
					</span>
				</div>
				<button
					type="button"
					onClick={clearCart}
					className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
				>
					Place Order
				</button>
			</div>
		</div>
	);
}

export default CartPage;
