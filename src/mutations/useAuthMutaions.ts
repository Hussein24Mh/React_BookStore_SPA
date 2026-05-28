import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/routs";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { loginService, registerService, logoutService } from "../services";

export function useRegisterMutation(onRegistered?: () => void) {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: registerService,

		onSuccess: () => {
			console.log("Account created successfully! Please log in.");
			alert("Account created successfully! Please log in.");
			onRegistered?.();
			navigate(ROUTES.login);
		},

		onError: (error: Error) => {
			console.log(error.message);
			alert(error.message);
		},
	});
}

export function useLoginMutation() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: loginService,

		onSuccess: (_, credentials) => {
			console.log("Login successful");
			alert(`Welcome ${credentials.email}`);
			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
			navigate(ROUTES.home);
		},

		onError: (error: Error) => {
			console.log(error.message);
			alert(error.message);
		},
	});
}

export function useLogoutMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logoutService,

		onSuccess: () => {
			console.log("Login successful");
			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
		},

		onError: (error: Error) => {
			console.log(error.message);
			alert(error.message);
		},
	});
}
