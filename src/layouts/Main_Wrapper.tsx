import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header  from "./Header";
import { useGlobalContext } from "../contexts/GlobalStatus";

function Main_Wrapper(){

    const { theme } = useGlobalContext();

    return(
        <div className={`${theme} flex flex-col min-h-screen`}>
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Main_Wrapper;