import RouterContext from "./router/Router";
import { GlobalStatusProvider } from "./contexts/GlobalStatus";

function App(){
    return (
        <GlobalStatusProvider>
            <RouterContext/>
        </GlobalStatusProvider>
    )
}

export default App;