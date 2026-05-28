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

export interface UserCartType {
	bookId: number;
	quantity: number;
}

export interface UserDataType {
	username: string;
	email: string;
	password: string;
	cart: UserCartType[];
}
