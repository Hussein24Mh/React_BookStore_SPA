import { useQuery } from "@tanstack/react-query";

import { getUserDataService, getUserCartDataService, getCartCount } from "../services";

export function useCurrentUserDataQuery() {
	return useQuery({
		queryKey: ["currentUser"],
		queryFn: getUserDataService,
		retry: false,
	});
}

export function useCurrentUserCartDataQuery() {
	return useQuery({
		queryKey: ["currentUserCart"],
		queryFn: getUserCartDataService,
		retry: false,
	});
}

export function useCurrentUserCartCountQuery() {
	return useQuery({
		queryKey: ["currentUserCartCount"],
		queryFn: getCartCount,
		retry: false,
	});
}
