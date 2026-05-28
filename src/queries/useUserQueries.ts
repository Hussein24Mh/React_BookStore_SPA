import { useQuery } from "@tanstack/react-query";

import { getUserDataService, getUserCartDataService } from "../services";

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
