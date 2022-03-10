import { GoogleLoginResponse } from "react-google-login";

type User = {
	email: string;
	id: number;
}

type AuthResponse = {
	success: boolean;
	message: string;
	token: string;
	user: User; 
}

type LoggedUser = {
	email: string;
	id: number;
	token: string;
}

export async function setAuth(url: string, authInfo: GoogleLoginResponse): Promise<void> {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "Application/JSON"
		},
		body: JSON.stringify({
			token: authInfo
		})
	});
	const {user: {email, id}, token}: AuthResponse = await response.json();
	localStorage.setItem("currentUser", JSON.stringify({
		email,
		id,
		token
	}));
} 

export function getCurrentUser(): LoggedUser | null {
	const currentUser = localStorage.getItem("currentUser")
	if (!currentUser) return null;
	return JSON.parse(currentUser);
} 