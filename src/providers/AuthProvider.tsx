import { createContext, useContext, useState } from "react";
import {
	loadUsers,
	saveUsers,
	getCurrentUser,
	saveCurrentUser,
} from "../services/AuthService";
import type { User, CartItem } from "../types/User";

interface AuthContextType {
	currentUser: User | null;
	addToCart: (bookId: number) => void;
	clearCart: () => void;
	decreaseQuantity: (bookId: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [currentUser, setCurrentUser] = useState<User | null>(() => {
		return getCurrentUser();
	});

	const updateUserCart = (newCart: CartItem[]) => {
		if (!currentUser) return;
		const users = loadUsers();
		const updatedUser = { ...currentUser, cart: newCart };
		const updated = users.map((u) =>
			u.email === currentUser.email ? updatedUser : u,
		);
		saveUsers(updated);
		setCurrentUser(updatedUser);
		saveCurrentUser(updatedUser);
	};

	const addToCart = (bookId: number) => {
		if (!currentUser) return;
		const existing = currentUser.cart.find(
			(item) => item.bookId === bookId,
		);
		const newCart = existing
			? currentUser.cart.map((item) =>
					item.bookId === bookId
						? { ...item, quantity: item.quantity + 1 }
						: item,
				)
			: [...currentUser.cart, { bookId, quantity: 1 }];
		updateUserCart(newCart);
	};

	const decreaseQuantity = (bookId: number) => {
		if (!currentUser) return;
		const newCart = currentUser.cart
			.map((item) =>
				item.bookId === bookId
					? { ...item, quantity: item.quantity - 1 }
					: item,
			)
			.filter((item) => item.quantity > 0);
		updateUserCart(newCart);
	};

	const clearCart = () => {
		if (!currentUser) return;
		updateUserCart([]);
	};

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				addToCart,
				clearCart,
				decreaseQuantity,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context)
		throw new Error("useAuthContext must be used within AuthProvider");
	return context;
}
