import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/routs";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { login } from "../services/AuthService";

import type { LoginUserType } from "../types/User";

const useLoginMutation = () => {
	const queryClient = useQueryClient();

	const navigate = useNavigate();

	return useMutation({
		mutationFn: (credentials: LoginUserType) =>
			{
			const ok = login(credentials);
			if (!ok) throw new Error("Invalid email or password");
			return Promise.resolve(ok);
		},

		onSuccess: (_, credentials) => {
			console.log("Login successful");
			alert(`Welcome ${credentials.email}`);
			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
			navigate(ROUTES.home);
		},

		onError: () => {
			console.log("Login failed");
			alert("Login failed");
		},
	});
};

export default useLoginMutation;
