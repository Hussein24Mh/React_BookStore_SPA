import { createBrowserRouter, RouterProvider} from "react-router-dom";

import ROUTES from "./routs";

import Main_Wrapper from "../layouts/Main_Wrapper";
import ErrorPage from "../pages/Error";

import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import CartPage from "../pages/Cart"
import UserProfile from "../pages/UserProfile";



// --- ROUTER ---
const router = createBrowserRouter([
    {
        element: <Main_Wrapper />,
        errorElement: <ErrorPage />,   // ← catches runtime errors in any child
        children: [
            { path: ROUTES.home,           element: <HomePage /> },
            { path: ROUTES.login,          element: <LoginPage /> },
            { path: ROUTES.checkout,       element: <CartPage /> },
            { path: ROUTES.profile,        element: <UserProfile /> },
        ],
    },
]);

// --- APP ---
function RouterContext() {
    return <RouterProvider router={router} />;
}

export default RouterContext;
