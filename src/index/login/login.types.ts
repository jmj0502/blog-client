type User = {
	email: string;
	id: number;
}

export type AuthResponse = {
	success: boolean;
	message: string;
	token: string;
	user: User; 
}

export type LoggedUser = {
	email: string;
	id: number;
	token: string;
}