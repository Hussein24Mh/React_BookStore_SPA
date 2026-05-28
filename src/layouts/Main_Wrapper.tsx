import { Outlet } from "react-router-dom";
import FooterComp from "./Footer";
import HeaderComp from "./Header";
import useGlobalContext from "../providers/GlobalStatusProvider";

function MainWrapperLayout() {
	const { theme } = useGlobalContext();

	return (
		<div className={`${theme} flex flex-col`}>
			<HeaderComp />

			<main className="flex min-h-screen background-divs-theme">
				<Outlet />
			</main>

			<FooterComp />
		</div>
	);
}

export default MainWrapperLayout;
