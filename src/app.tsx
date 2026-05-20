import RouterContext from "./router/Router";
import { GlobalStatusProvider } from "./contexts/GlobalStatus";
import { AuthProvider } from "./contexts/Auth";

function App() {
	return (
		<GlobalStatusProvider>
			<AuthProvider>
				<RouterContext />
			</AuthProvider>
		</GlobalStatusProvider>
	);
}

export default App;