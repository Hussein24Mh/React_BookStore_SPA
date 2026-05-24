export interface CartItem {
	bookId: number;
	quantity: number;
}

export interface UserData {
	username: string;
	email: string;
	password: string;
	cart: CartItem[];
}

export interface RegisterUserType {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface LoginUserType {
	email: string;
	password: string;
}
