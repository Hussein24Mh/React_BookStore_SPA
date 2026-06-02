import { createContext, useContext, useState } from "react";

interface ModalContextProps {
	modalContent: React.ReactNode | null;
	openModal: (content: React.ReactNode) => void;
	closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
	const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

	return (
		<ModalContext.Provider
			value={{
				modalContent,
				openModal: (content) => setModalContent(content),
				closeModal: () => setModalContent(null),
			}}
		>
			{children}
		</ModalContext.Provider>
	);
}

export function useModalContext() {
	const context = useContext(ModalContext);
	if (!context) throw new Error("useModalContext must be used within ModalProvider");
	return context;
}
