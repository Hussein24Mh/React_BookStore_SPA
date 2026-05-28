import { getCurrentUser, addToCartApi, decreaseQuantityApi, clearCartApi } from "../api";

export async function addCartItemService(id: number) {
	const currentUser = getCurrentUser();
	if (!currentUser) throw new Error("You must be logged in to add to cart");
	return addToCartApi(id);
}

export async function decreaseCartItemService(id: number) {
	const currentUser = getCurrentUser();
	if (!currentUser) throw new Error("You must be logged in");
	return decreaseQuantityApi(id);
}

export async function placeCartOrderService() {
	const currentUser = getCurrentUser();
	if (!currentUser) throw new Error("You must be logged in to place an order");
	return clearCartApi();
}
