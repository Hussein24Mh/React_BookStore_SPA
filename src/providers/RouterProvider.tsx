import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ROUTES from "../utils/routs";

import MainWrapperLayout from "../layouts/Main_Wrapper";

import { HomePage, CartPage, ErrorPage, LoginPage, NotFoundPage, UserProfilePage, TestingPage } from "../pages";

// --- ROUTER ---
const router = createBrowserRouter([
	{
		element: <MainWrapperLayout />,
		errorElement: <ErrorPage />, // ← catches runtime errors in any child
		children: [
			{ path: ROUTES.home, element: <HomePage /> },
			{ path: ROUTES.login, element: <LoginPage /> },
			{ path: ROUTES.cart, element: <CartPage /> },
			{ path: ROUTES.profile, element: <UserProfilePage /> },
			{ path: ROUTES.test, element: <TestingPage /> },
			{ path: "*", element: <NotFoundPage /> },
		],
	},
]);

// --- APP ---
function AppRouter() {
	return <RouterProvider router={router} />;
}

export default AppRouter;
