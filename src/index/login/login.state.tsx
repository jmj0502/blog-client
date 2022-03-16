import React, { useEffect, useState } from "react";
import { LoginContext } from "./login.context";
import { GoogleLoginResponse } from "react-google-login";
import {
	AuthResponse,
	LoggedUser
} from "./login.types";

export const LoginState = ({children}: any) => {
	const [isLoggedUser, setIsLoggedUser] = useState<boolean>(false);

	useEffect(() => {
		const user = getCurrentUser();
		if (user)
			setIsLoggedUser(true);
	}, [])

	async function setAuth(url: string, authInfo: GoogleLoginResponse): Promise<boolean> {
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "Application/JSON"
				},
				body: JSON.stringify({
					token: authInfo.tokenId
				})
			});
	
			if (response.status !== 200) {
				return false;
			}
	
			const {user: {email, id}, token}: AuthResponse = await response.json();
			localStorage.setItem("currentUser", JSON.stringify({
				email,
				id,
				token
			}));
			setIsLoggedUser(true);
	
			return true;
		} catch(err) {
			console.log("error");
			return false;
		}
	} 

	function getCurrentUser(): LoggedUser | null {
		const currentUser = localStorage.getItem("currentUser")
		if (!currentUser) return null;
		return JSON.parse(currentUser);
	} 

	return (
		<LoginContext.Provider
		value={{
			setAuth,
			isLoggedUser,
			getCurrentUser
		}}
		>
			{children}
		</LoginContext.Provider>
	)
} 