import ROUTES from "../utils/routs";
import { Link } from "react-router-dom";
import { useState } from "react";
import useGlobalContext from "../providers/GlobalStatusProvider";
import { ShoppingCart } from "lucide-react";

import useLogoutMutation from "../mutations/useLogoutMutation";
import { useCurrentUserData } from "../queries/useUserQueries";

function NavLinks() {
	const { theme, toggleTheme } = useGlobalContext();
	const { data: user } = useCurrentUserData();
	const { mutate: logout } = useLogoutMutation();

	return (
		<>
			{user ? (
				<>
					<Link to={ROUTES.profile}>
						<span className="m-auto">{user.username}</span>
					</Link>
					<button
						type="button"
						onClick={() => logout()}
						className="cursor-pointer hover:text-indigo-600"
					>
						Logout
					</button>
				</>
			) : (
				<Link
					to={ROUTES.login}
					className="cursor-pointer hover:text-indigo-600 text-center"
				>
					Login
				</Link>
			)}

			<Link to={ROUTES.checkout} className="cursor-pointer">
				<ShoppingCart />
			</Link>

			<button
				type="button"
				onClick={toggleTheme}
				className="text-sm px-3 py-1 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
			>
				{theme === "light" ? "☀️" : "🌙"}
			</button>
		</>
	);
}

function HeaderComp() {
	const [menu, setOpen] = useState(false);

	const toggleMenu = () => {
		setOpen((prev) => !prev);
	};

	return (
		<nav className="flex flex-col">
			<div className="flex items-center justify-between px-8 py-3 shadow-sm main-divs-theme">
				<div>
					<Link to={ROUTES.home}>
						<span className="text-3xl">LOGO</span>
					</Link>
				</div>

				<div className="flex items-center hidden sm:flex gap-6">
					<NavLinks />
				</div>

				<button
					type="button"
					className="text-xl cursor-pointer sm:hidden"
					onClick={toggleMenu}
				>
					☰
				</button>
			</div>

			{menu && (
				<div className="flex flex-col items-center gap-5 py-5 main-divs-theme">
					<NavLinks />
				</div>
			)}
		</nav>
	);
}

export default HeaderComp;
