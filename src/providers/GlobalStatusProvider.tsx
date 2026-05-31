import { createContext, useContext, useState } from "react";
import { useCurrentThemeQuery } from "../queries/useThemeQueries";
import { useToggleThemeMutation } from "../mutations/useThemeMutations";

type Theme = "light" | "dark";

interface GlobalState {
	theme: Theme;
	toggleTheme: () => void;
	modalContent: React.ReactNode | null;
	openModal: (content: React.ReactNode) => void;
	closeModal: () => void;
}

const GlobalContext = createContext<GlobalState | null>(null);

export function GlobalStatusProvider({ children }: { children: React.ReactNode }) {
	const { data: theme = "light" } = useCurrentThemeQuery();
	const { mutate: toggleTheme } = useToggleThemeMutation();
	const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

	return (
		<GlobalContext.Provider
			value={{
				theme,
				toggleTheme,
				modalContent,
				openModal: (content) => setModalContent(content),
				closeModal: () => setModalContent(null),
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
