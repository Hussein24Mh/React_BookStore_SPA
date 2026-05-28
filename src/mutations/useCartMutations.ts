import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/routs";

import { useQueryClient, useMutation , type QueryClient} from "@tanstack/react-query";

import { addCartItemService, decreaseCartItemService, placeCartOrderService} from "../services/CartService";

const invalidateCart = (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: ["currentUserCart"] });
};

export function useAddToCartMutation(){
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addCartItemService,
		onSuccess: () => {
			invalidateCart(queryClient);
		},
	});
};

export function useDecreaseQuantityMutation(){
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: decreaseCartItemService,
		onSuccess: () => {
			invalidateCart(queryClient);
		},
	});
};

export function usePlaceOrderMutation(){
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: placeCartOrderService,
		onSuccess: () => {
			invalidateCart(queryClient);
			alert("Order Placed successfully!");
			navigate(ROUTES.home);
		},
	});
};
