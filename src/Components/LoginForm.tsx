import { useForm } from "react-hook-form";
import type { FieldError } from "react-hook-form";

import type { LoginUserType } from "../types";

type FieldProps = {
	placeholder: string;
	type?: string;
	error?: FieldError;
	registration: object;
};

function LoginFormField({ placeholder, type = "text", error, registration }: FieldProps) {
	return (
		<div className="flex flex-col gap-1">
			<input
				{...registration}
				type={type}
				placeholder={placeholder}
				className="w-full px-4 py-2 rounded border-1 border-slate-300 focus:border-yellow-400 outline-none"
			/>
			<p className="text-red-500 px-2 py-2 min-h-[25px]">{error?.message}</p>
		</div>
	);
}

interface LoginFormProps {
	onSubmit: (credentials: LoginUserType) => void;
	isPending: boolean;
	error: Error | null;
}

export function LoginFormComp({ onSubmit, isPending, error }: LoginFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<LoginUserType>({ mode: "onChange" });

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1 w-[100%]">
			<h1 className="text-xl font-bold px-2 py-6">Login</h1>

			<LoginFormField
				placeholder="Email"
				error={errors.email}
				registration={register("email", {
					required: "* Email is required",
					pattern: {
						value: /^\S+@\S+\.\S+$/,
						message: "* Invalid email",
					},
				})}
			/>

			<LoginFormField
				placeholder="Password"
				type="password"
				error={errors.password}
				registration={register("password", {
					required: "* Password is required",
					minLength: { value: 6, message: "* Min 6 characters" },
				})}
			/>

			<button
				type="submit"
				disabled={!isValid || isPending}
				className="w-full py-3 text-base bg-emerald-500 hover:bg-emerald-600 font-semibold rounded active:scale-95 transition-all cursor-pointer tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Login
			</button>
		</form>
	);
}
