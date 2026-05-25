import { createContext, useContext, useState } from "react";
import { saveTheme, loadTheme } from "../services/ThemeService";

type Theme = "light" | "dark";

interface GlobalState {
	theme: Theme;
	toggleTheme: () => void;
}

const GlobalContext = createContext<GlobalState | null>(null);

export function GlobalStatusProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [theme, setTheme] = useState<Theme>(loadTheme());

	const toggleTheme = () => {
		setTheme((prev) => {
			const next = prev === "light" ? "dark" : "light";
			saveTheme(next);
			return next;
		});
	};

	return (
		<GlobalContext.Provider
			value={{
				theme,
				toggleTheme,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}

function useGlobalContext() {
	const context = useContext(GlobalContext);
	if (!context)
		throw new Error(
			"useGlobalContext must be used within GlobalStatusProvider",
		);
	return context;
}

export default useGlobalContext;
