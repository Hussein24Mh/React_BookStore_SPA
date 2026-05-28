import * as authapis from "../api/authApi";

export async function addCartItemService(id: number) {
    const currentUser = authapis.getCurrentUser();
    if (!currentUser) throw new Error("You must be logged in to add to cart");
    return authapis.addToCartApi(id);
}

export async function decreaseCartItemService(id: number) {
    const currentUser = authapis.getCurrentUser();
    if (!currentUser) throw new Error("You must be logged in");
    return authapis.decreaseQuantityApi(id);
}

export async function placeCartOrderService() {
    const currentUser = authapis.getCurrentUser();
    if (!currentUser) throw new Error("You must be logged in to place an order");
    return authapis.clearCartApi();
}