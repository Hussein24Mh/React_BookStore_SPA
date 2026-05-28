import { registerApi, loginApi, logoutApi } from "../api";
import type { RegisterUserType, LoginUserType } from "../types";

export async function registerService(credentials: RegisterUserType) {
	const res = registerApi(credentials);
	if (!res.success) {
		switch (res.reason) {
			case "email_already_exists":
				throw new Error("This email is already registered");
			default:
				throw new Error("Registration failed, please try again");
		}
	}
	return res;
}

export async function loginService(credentials: LoginUserType) {
	const res = loginApi(credentials);
	if (!res.success) {
		switch (res.reason) {
			case "invalid_credentials":
				throw new Error("Invalid email or password");
			default:
				throw new Error("Login failed, please try again");
		}
	}
	return res;
}

export async function logoutService() {
	const res = logoutApi();
	return res;
}
