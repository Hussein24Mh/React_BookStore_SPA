import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUserDataQuery } from "../queries";
import ROUTES from "../utils/routs";

export function ProtectedRouteFeature() {
	const { data: user, isLoading } = useCurrentUserDataQuery();

	if (isLoading) return null;
	if (!user) return <Navigate to={ROUTES.login} replace />;

	return <Outlet />;
}
