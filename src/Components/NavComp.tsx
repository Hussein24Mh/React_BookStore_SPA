import { Link } from "react-router-dom";
import ROUTES from "../utils/routs";

interface NavCompProps {
	menu: boolean;
	toggleMenu: () => void;
	navLinks: React.ReactNode;
}

export function NavComp({ menu, toggleMenu, navLinks }: NavCompProps) {
	return (
		<nav className="flex flex-col">
			<div className="flex items-center justify-between px-8 py-3 shadow-sm main-divs-theme">
				<Link to={ROUTES.home}>
					<span className="text-3xl">LOGO</span>
				</Link>
				<div className="hidden sm:flex gap-6">{navLinks}</div>
				<button type="button" className="text-xl cursor-pointer sm:hidden" onClick={toggleMenu}>
					☰
				</button>
			</div>
			{menu && <div className="flex flex-col items-center gap-5 py-5 main-divs-theme">{navLinks}</div>}
		</nav>
	);
}
