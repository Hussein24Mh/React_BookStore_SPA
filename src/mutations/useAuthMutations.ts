import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/routs";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { loginService, registerService, logoutService } from "../services";

export function useRegisterMutation(onRegistered?: () => void) {
	const navigate = useNavigate();

	const notify_success = () => toast.success("Account created successfully! Please log in.");
	const notify_error = (message: string) => toast.error(message);

	return useMutation({
		mutationFn: registerService,

		onSuccess: () => {
			notify_success();
			onRegistered?.();
			navigate(ROUTES.login);
		},

		onError: (error: Error) => {
			notify_error(error.message);
		},
	});
}

export function useLoginMutation() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const notify_success = (email: string) => toast.success(`Welcome ${email}`);
	const notify_error = (message: string) => toast.error(message);

	return useMutation({
		mutationFn: loginService,

		onSuccess: (_, credentials) => {
			notify_success(credentials.email);
			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
			navigate(ROUTES.home);
		},

		onError: (error: Error) => {
			notify_error(error.message);
		},
	});
}

export function useLogoutMutation() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const notify_success = () => toast.success("LogOut Successfully");
	const notify_error = (message: string) => toast.error(message);

	return useMutation({
		mutationFn: logoutService,

		onSuccess: () => {
			notify_success();
			navigate(ROUTES.home);
			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
		},

		onError: (error: Error) => {
			notify_error(error.message);
		},
	});
}
