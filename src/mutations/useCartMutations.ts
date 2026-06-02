import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/routs";

import toast from "react-hot-toast";

import { useQueryClient, useMutation, type QueryClient } from "@tanstack/react-query";

import { addCartItemService, decreaseCartItemService, placeCartOrderService } from "../services";

const invalidateCart = (queryClient: QueryClient) => {
	queryClient.invalidateQueries({ queryKey: ["currentUserCart"] });
	queryClient.invalidateQueries({ queryKey: ["currentUserCartCount"] });
};

export function useAddToCartMutation() {
	const queryClient = useQueryClient();
	const notify_success = () => toast.success("Item added Successfully");

	return useMutation({
		mutationFn: addCartItemService,
		onSuccess: () => {
			notify_success();
			invalidateCart(queryClient);
		},
		onError: () => toast.error("Failed adding item, Please Login"),
	});
}

export function useDecreaseQuantityMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: decreaseCartItemService,
		onSuccess: () => {
			invalidateCart(queryClient);
		},
	});
}

export function usePlaceOrderMutation() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const notify_success = () => toast.success("Order Placed Successfully");

	return useMutation({
		mutationFn: placeCartOrderService,
		onSuccess: () => {
			invalidateCart(queryClient);
			notify_success();
			navigate(ROUTES.home);
		},
	});
}
