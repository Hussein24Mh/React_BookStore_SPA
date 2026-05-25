import { useQuery } from "@tanstack/react-query";

import {
	getCurrentUser,
	getCartItems,
	getCartTotal,
} from "../services/AuthService";

export const useCurrentUserData = () => {
	return useQuery({
		queryKey: ["currentUser"],

		queryFn: getCurrentUser,

		retry: false,
	});
};

export const useCurrentUserCart = () => {
	return useQuery({
		queryKey: ["currentUserCart"],
		queryFn: getCartItems,
		retry: false,
	});
};

export const useCartTotalQuery = () => {
	return useQuery({
		queryKey: ["cartTotal"],
		queryFn: getCartTotal,
		retry: false,
	});
};
