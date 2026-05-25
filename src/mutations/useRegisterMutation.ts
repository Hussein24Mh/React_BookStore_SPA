import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/routs";

import { useMutation } from "@tanstack/react-query";

import type { RegisterUserType } from "../types/User";

import { register } from "../services/AuthService";

const useRegisterMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (credentials: RegisterUserType) =>
			Promise.resolve(register(credentials)),

		onSuccess: () => {
			console.log("Account created successfully! Please log in.");
			alert("Account created successfully! Please log in.");
			navigate(ROUTES.login);
		},

		onError: () => {
			console.log("register failed");
			alert("register failed");
		},
	});
};

export default useRegisterMutation;
