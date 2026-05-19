import { createContext, useContext, useState } from "react";

interface GlobalState {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

const GlobalContext = createContext<GlobalState  | null>(null);


export function GlobalStatusProvider({ children }: { children: React.ReactNode }){
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");


    return (
        <GlobalContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) throw new Error("useGlobalContext must be used within GlobalStatusProvider");
    return context;
}