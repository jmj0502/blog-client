import React, { useState } from "react";
import { LoginContext } from "./login.context";
import { GoogleLoginResponse } from "react-google-login";
import {
	AuthResponse,
	LoggedUser
} from "./login.types";

export const LoginState = ({children}: any) => {

	async function setAuth(url: string, authInfo: GoogleLoginResponse): Promise<void> {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "Application/JSON"
			},
			body: JSON.stringify({
				token: authInfo.tokenId
			})
		});
		const {user: {email, id}, token}: AuthResponse = await response.json();
		localStorage.setItem("currentUser", JSON.stringify({
			email,
			id,
			token
		}));
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
			getCurrentUser
		}}
		>
			{children}
		</LoginContext.Provider>
	)
} 