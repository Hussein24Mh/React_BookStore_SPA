import { useEffect } from "react";

import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { ModalComp } from "../Components";

import FooterComp from "./Footer";
import HeaderComp from "./Header";
import { useGlobalContext } from "../providers/GlobalStatusProvider";

function ScrollToTop() {
	const { pathname } = useLocation();
	// biome-ignore lint/correctness/useExhaustiveDependencies: scroll on route change
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return null;
}

function MainWrapperLayout() {
	const { theme, modalContent, closeModal } = useGlobalContext();

	return (
		<div className={`${theme} flex flex-col min-h-screen`}>
			<ScrollToTop />
			<HeaderComp />
			<main className="flex flex-1 background-divs-theme">
				<Outlet />
			</main>
			<FooterComp />

			<Toaster position="bottom-right" reverseOrder={false} />

			<ModalComp isOpen={modalContent !== null} onClose={closeModal}>
				{modalContent}
			</ModalComp>
		</div>
	);
}

export default MainWrapperLayout;
