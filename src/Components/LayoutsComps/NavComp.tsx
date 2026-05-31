import { Link } from "react-router-dom";
import ROUTES from "../../utils/routs";

import { BookOpen } from "lucide-react";

interface NavCompProps {
	menu: boolean;
	toggleMenu: () => void;
	navLinks: React.ReactNode;
}

export function NavComp({ menu, toggleMenu, navLinks }: NavCompProps) {
	return (
		<nav className="flex flex-col sticky top-0 z-50">
			<div className="flex justify-between items-center gap-5 px-10 py-3 shadow-sm main-divs-theme">
				<Link to={ROUTES.home} className="flex items-center gap-2">
					<BookOpen className="text-emerald-500" size={28} />
					<span className="text-4xl font-bold tracking-tight">
						Book<span className="text-emerald-500">store</span>
					</span>
				</Link>
				<div className="hidden sm:flex items-center gap-6">{navLinks}</div>
				<button type="button" className="text-2xl cursor-pointer sm:hidden" onClick={toggleMenu}>
					☰
				</button>
			</div>
			{menu && <div className="flex flex-col items-center gap-5 py-5 main-divs-theme">{navLinks}</div>}
		</nav>
	);
}
