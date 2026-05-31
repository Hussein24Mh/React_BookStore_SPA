import { Link } from "react-router-dom";
import ROUTES from "../../utils/routs";

import { ShoppingCart } from "lucide-react";

import type { UserDataType, Theme } from "../../types";

interface NavLinksProps {
	user: UserDataType | null | undefined;
	theme: Theme;
	toggleTheme: () => void;
	logout: () => void;
	cartCount?: number;
}

export function NavLinksComps({ user, theme, toggleTheme, logout, cartCount = 0 }: NavLinksProps) {
	return (
		<>
			{user ? (
				<>
					<Link to={ROUTES.profile}>
						<span className="m-auto">{user.username}</span>
					</Link>
					<button type="button" onClick={logout} className="cursor-pointer hover:text-indigo-600">
						Logout
					</button>
					<Link to={ROUTES.cart} className="cursor-pointer relative">
						<ShoppingCart />
						{cartCount > 0 && (
							<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
								{cartCount}
							</span>
						)}
					</Link>
				</>
			) : (
				<Link to={ROUTES.login} className="cursor-pointer hover:text-indigo-600 text-center">
					Login
				</Link>
			)}

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
