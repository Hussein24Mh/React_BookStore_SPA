import * as authapis from "../api/authApi";
import type { RegisterUserType, LoginUserType } from "../types/Auth";


export async function registerService(credentials: RegisterUserType) {
	const res = authapis.registerApi(credentials);
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
	const res = authapis.loginApi(credentials);
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
	const res = authapis.logoutApi();
	return res;
}