import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./RouterProvider";
import { GlobalStatusProvider } from "./GlobalStatusProvider";
import { ModalProvider } from "./ModalProvider";

const queryClient = new QueryClient();

function AppProviders() {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStatusProvider>
				<ModalProvider>
					<AppRouter />
				</ModalProvider>
			</GlobalStatusProvider>
		</QueryClientProvider>
	);
}

export default AppProviders;
