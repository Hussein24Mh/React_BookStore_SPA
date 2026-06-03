export function CartEmptyFeature() {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center m-auto">
			<img src="/empty-cart.png" alt="Empty cart" className="w-40 h-40 object-contain" />

			<h2 className="mt-4 text-2xl font-semibold">Your cart is empty</h2>

			<p className="mt-2 text-gray-500">Looks like you haven't added any books yet.</p>
		</div>
	);
}
