export interface CartItem {
	bookId: number;
	quantity: number;
}

export interface User {
	username: string;
	email: string;
	password: string;
	cart: CartItem[];
}
