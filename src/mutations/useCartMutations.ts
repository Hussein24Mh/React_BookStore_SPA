import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/routs";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import {
	addToCart,
	decreaseQuantity,
	clearCart,
} from "../services/AuthService";

const invalidateCart = (queryClient: ReturnType<typeof useQueryClient>) => {
	queryClient.invalidateQueries({ queryKey: ["currentUser"] });
	queryClient.invalidateQueries({ queryKey: ["currentUserCart"] });
	queryClient.invalidateQueries({ queryKey: ["cartTotal"] });
};

export const useAddToCartMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (bookId: number) => Promise.resolve(addToCart(bookId)),
		onSuccess: () => {
			invalidateCart(queryClient)
		},
	});
};

export const useDecreaseQuantityMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (bookId: number) =>
			Promise.resolve(decreaseQuantity(bookId)),
		onSuccess: () => {
			invalidateCart(queryClient)
		},
	});
};

export const useClearCartMutation = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: () => Promise.resolve(clearCart()),
		onSuccess: () => {
			invalidateCart(queryClient)
			alert("Order Placed successfully!");
			navigate(ROUTES.home);
		},
	});
};
