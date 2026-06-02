import { usePlaceOrderMutation, useAddToCartMutation, useDecreaseQuantityMutation } from "../mutations";
import { useCurrentUserCartDataQuery } from "../queries";

import {  CartEmptyFeature } from "../Features";
import { CartitemComp } from "../Components";

export function CartPage() {
	const { mutate: place_order } = usePlaceOrderMutation();
	const { mutate: addToCart } = useAddToCartMutation();
	const { mutate: decreaseQuantity } = useDecreaseQuantityMutation();
	const { data: cartData, isLoading, error } = useCurrentUserCartDataQuery();

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error loading cart</p>;
	if (!cartData?.enrichedCart.length) return <CartEmptyFeature/>;

	return (
		<div className="flex gap-10 mx-auto my-10 items-top">
			<div className="flex flex-col gap-4 p-6 rounded h-fit secondery-divs-theme">
				{cartData.enrichedCart.map((item) => (
					<CartitemComp
						key={item.id}
						{...item}
						add_to_cart={() => addToCart(item.id)}
						decrease_quantity={() => decreaseQuantity(item.id)}
					/>
				))}
			</div>

			<div className="flex flex-col gap-4 p-6 rounded h-fit secondery-divs-theme">
				<h2 className="text-2xl font-bold py-6 px-15">Order Summary</h2>

				<div className="flex justify-between">
					<span>Total</span>
					<span className="text-emerald-600 font-bold">£{cartData.cartTotal}</span>
				</div>

				<button
					type="button"
					onClick={() => place_order()}
					className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
				>
					Place Order
				</button>
			</div>
		</div>
	);
}
