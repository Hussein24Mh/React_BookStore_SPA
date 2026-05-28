import { useState } from "react";

import { useLoginMutation, useRegisterMutation } from "../mutations";

import { LoginFormComp, RegisterFormComp } from "../Components";

export function LoginPage() {
	const [haveAccount, setHaveAccount] = useState(true);
	const { mutate: login, isPending: loginPending, error: loginError } = useLoginMutation();
	const {
		mutate: register,
		isPending: registerPending,
		error: registerError,
	} = useRegisterMutation(() => setHaveAccount(true));

	const togglehaveAccount = () => setHaveAccount((prev) => !prev);

	return (
		<div className="flex flex-col p-4 gap-6 mx-auto mt-10 rounded main-divs-theme h-fit w-[100%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[35%]">
			{haveAccount ? (
				<LoginFormComp onSubmit={login} isPending={loginPending} error={loginError} />
			) : (
				<RegisterFormComp onSubmit={register} isPending={registerPending} error={registerError} />
			)}

			<button
				type="button"
				onClick={togglehaveAccount}
				className="cursor-pointer hover:text-blue-500 transition-colors"
			>
				{haveAccount ? "Don't have an account?" : "Already have an account?"}
			</button>
		</div>
	);
}
