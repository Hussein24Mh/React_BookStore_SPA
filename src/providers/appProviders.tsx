import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./RouterProvider";
import { GlobalStatusProvider } from "./GlobalStatusProvider";
import { AuthProvider } from "./AuthProvider";

const queryClient = new QueryClient();

function AppProviders() {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStatusProvider>
				<AuthProvider>
					<AppRouter />
				</AuthProvider>
			</GlobalStatusProvider>
		</QueryClientProvider>
	);
}

export default AppProviders;
