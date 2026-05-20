import { Outlet } from "react-router-dom";
import FooterComp from "./Footer";
import HeaderComp from "./Header";
import { useGlobalContext } from "../contexts/GlobalStatus";

function Main_Wrapper() {
	const { theme } = useGlobalContext();

	return (
		<div className={`${theme} flex flex-col min-h-screen`}>
			<HeaderComp />
			<main className="flex flex-1 p-3 background-divs-theme">
				<Outlet />
			</main>
			<FooterComp />
		</div>
	);
}

export default Main_Wrapper;
