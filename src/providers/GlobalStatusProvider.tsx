import { createContext, useContext } from "react";
import { useCurrentThemeQuery } from "../queries/useThemeQueries";
import { useToggleThemeMutation } from "../mutations/useThemeMutations";
import type { Theme } from "../types";

interface GlobalState {
	theme: Theme;
	toggleTheme: () => void;
}

const GlobalContext = createContext<GlobalState | null>(null);

export function GlobalStatusProvider({ children }: { children: React.ReactNode }) {
	const { data: theme = "light" } = useCurrentThemeQuery();
	const { mutate: toggleTheme } = useToggleThemeMutation();

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

export function useGlobalContext() {
	const context = useContext(GlobalContext);
	if (!context) throw new Error("useGlobalContext must be used within GlobalStatusProvider");
	return context;
}
