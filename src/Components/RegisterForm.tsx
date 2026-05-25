import { useForm } from "react-hook-form";
import type { FieldError } from "react-hook-form";

import useRegisterMutation from "../mutations/useRegisterMutation";
import type { RegisterUserType } from "../types/User";

type Props = { onRegistered: () => void };

type FieldProps = {
	placeholder: string;
	type?: string;
	error?: FieldError;
	registration: object;
};

function RegisterFormFieldBlock({
	placeholder,
	type = "text",
	error,
	registration,
}: FieldProps) {
	return (
		<div className="flex flex-col gap-1">
			<input
				{...registration}
				type={type}
				placeholder={placeholder}
				className="w-full px-4 py-2 rounded border-1 border-slate-300 focus:border-yellow-400 outline-none"
			/>
			<p className="text-red-500 px-2 pd-2 min-h-[25px]">
				{error?.message}
			</p>
		</div>
	);
}

function RegisterFormComp({ onRegistered }: Props) {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isValid },
	} = useForm<RegisterUserType>({ mode: "onChange" });

	const { mutate: registermutation, isPending } = useRegisterMutation();

	function onSubmit(data: RegisterUserType) {
		registermutation(data, {
			onSuccess: () => {
				reset();
				onRegistered();
			},
		});
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-1 w-[100%]"
		>
			<h1 className="text-xl font-bold px-2 py-6">Create New Account</h1>

			<RegisterFormFieldBlock
				placeholder="Username"
				error={errors.username}
				registration={register("username", {
					required: "* Username is required",
					minLength: { value: 3, message: "* Min 3 characters" },
				})}
			/>

			<RegisterFormFieldBlock
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
			<RegisterFormFieldBlock
				placeholder="Password"
				type="password"
				error={errors.password}
				registration={register("password", {
					required: "* Password is required",
					minLength: { value: 6, message: "* Min 6 characters" },
				})}
			/>
			<RegisterFormFieldBlock
				placeholder="Confirm Password"
				type="password"
				error={errors.confirmPassword}
				registration={register("confirmPassword", {
					required: "* Please confirm your password",
					validate: (v) =>
						v === watch("password") || "* Passwords do not match",
				})}
			/>

			<button
				type="submit"
				disabled={!isValid || isPending}
				className="w-full py-3 text-base bg-emerald-500 hover:bg-emerald-600 font-semibold rounded active:scale-95 transition-all cursor-pointer tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Sign Up
			</button>
		</form>
	);
}

export default RegisterFormComp;
