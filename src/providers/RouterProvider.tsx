import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ROUTES from "../utils/routs";

import MainWrapperLayout from "../layouts/Main_Wrapper";
import { ProtectedRouteFeature } from "../Features";

import {
	HomePage,
	CartPage,
	SystemErrorPage,
	LoginPage,
	SystemNotFoundPage,
	UserProfilePage,
	TestingPage,
} from "../pages";

// --- ROUTER ---
const router = createBrowserRouter([
	{
		element: <MainWrapperLayout />,
		errorElement: <SystemErrorPage />, // ← catches runtime errors in any child
		children: [
			// 🔓 Public
			{ path: ROUTES.home, element: <HomePage /> },
			{ path: ROUTES.login, element: <LoginPage /> },
			{ path: ROUTES.test, element: <TestingPage /> },

			// 🔒 Protected
			{
				element: <ProtectedRouteFeature />,
				children: [
					{ path: ROUTES.cart, element: <CartPage /> },
					{ path: ROUTES.profile, element: <UserProfilePage /> },
				],
			},

			// 🚫 Catch-all (always last by convention)
			{ path: "*", element: <SystemNotFoundPage /> },
		],
	},
]);

// --- APP ---
function AppRouter() {
	return <RouterProvider router={router} />;
}

export default AppRouter;
