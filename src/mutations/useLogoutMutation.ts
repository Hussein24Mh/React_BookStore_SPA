import { useQueryClient, useMutation } from "@tanstack/react-query";

import { logout } from "../services/AuthService";

const useLogoutMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => Promise.resolve(logout()),

		onSuccess: () => {
			console.log("Login successful");
			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
		},

		onError: () => {
			console.log("Login failed");
			alert("Logout failed");
		},
	});
};

export default useLogoutMutation;
