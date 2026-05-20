import { createContext, useContext, useState } from "react";
import {
	loadUsers,
	saveUsers,
	getCurrentUser,
	saveCurrentUser,
	removeCurrentUser,
} from "../services/useStorage";
import type { User, CartItem } from "../types/User";

interface AuthContextType {
	currentUser: User | null;
	register: (username: string, email: string, password: string) => boolean;
	login: (email: string, password: string) => boolean;
	logout: () => void;
	addToCart: (bookId: number) => void;
	removeFromCart: (bookId: number) => void;
	clearCart: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [currentUser, setCurrentUser] = useState<User | null>(() => {
		return getCurrentUser();
	});

	const register = (
		username: string,
		email: string,
		password: string,
	): boolean => {
		const users = loadUsers();
		if (users.some((u) => u.email === email)) return false;
		const newUser: User = { username, email, password, cart: [] };
		saveUsers([...users, newUser]);
		return true;
	};

	const login = (email: string, password: string): boolean => {
		const users = loadUsers();
		const found = users.find(
			(u) => u.email === email && u.password === password,
		);
		if (!found) return false;
		setCurrentUser(found);
		saveCurrentUser(found);
		return true;
	};

	const logout = () => {
		setCurrentUser(null);
		removeCurrentUser();
	};

	const updateUserCart = (newCart: CartItem[]) => {
		if (!currentUser) return;
		const users = loadUsers();
		const updated = users.map((u) =>
			u.email === currentUser.email ? { ...u, cart: newCart } : u,
		);
		saveUsers(updated);
		const updatedUser = updated.find((u) => u.email === currentUser.email)!;
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

	const removeFromCart = (bookId: number) => {
		if (!currentUser) return;
		const newCart = currentUser.cart.filter(
			(item) => item.bookId !== bookId,
		);
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
				register,
				login,
				logout,
				addToCart,
				removeFromCart,
				clearCart,
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
