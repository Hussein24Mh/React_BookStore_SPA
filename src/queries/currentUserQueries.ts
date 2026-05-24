import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../services/AuthService";

const useCurrentUserQuery = () => {
	return useQuery({
		queryKey: ["currentUser"],

		queryFn: getCurrentUser,

		retry: false,
	});
};

export default useCurrentUserQuery;
