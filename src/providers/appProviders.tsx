import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./RouterProvider";
import { GlobalStatusProvider } from "./GlobalStatusProvider";

const queryClient = new QueryClient();

function AppProviders() {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStatusProvider>
				<AppRouter />
			</GlobalStatusProvider>
		</QueryClientProvider>
	);
}

export default AppProviders;
