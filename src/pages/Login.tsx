import LoginFormComp from "../Components/LoginForm";
import RegisterFormComp from "../Components/RegisterForm";
import { useState } from "react";

function LoginPage() {
	const [haveAccount, setHaveAccount] = useState(true);

	return (
		<div className="flex flex-col p-4 gap-6 mx-auto mt-10 rounded main-divs-theme h-fit w-[100%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[35%]">
			{haveAccount ? (
				<LoginFormComp />
			) : (
				<RegisterFormComp onRegistered={() => setHaveAccount(true)} />
			)}

			<button
				type="button"
				onClick={() => setHaveAccount((prev) => !prev)}
				className="cursor-pointer hover:text-blue-500 transition-colors"
			>
				{haveAccount
					? "Don't have an account?"
					: "Already have an account?"}
			</button>
		</div>
	);
}

export default LoginPage;
