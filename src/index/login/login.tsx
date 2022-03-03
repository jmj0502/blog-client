import { Box, Button, Container, Text } from "@chakra-ui/react";
import React from "react";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

export const Login: React.FC<{}> = () => {
	
	const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
		console.log("///// Google Response /////");
		const response = res as GoogleLoginResponse;
		console.log(JSON.stringify(response.profileObj));
		console.log("///// Google Response /////");
	}

	const onFailure = (res: any): void => {
		console.log("///// Error While Logging in ////");
		console.log(res);
		console.log("///// Error While Logging in ////");
	}
	
	const googleClientID: string = `${process.env.REACT_APP_GOOGLE_ID}`;

	return (
		<Container
			centerContent	
		>
			<Box 
				borderWidth="1px" 
				borderRadius="lg"
				padding="5px"
			>
				<Text>Sign In with Google</Text>
				<GoogleLogin
				style={{
					padding: "7px",
					borderRadius: "50px" 
				}}
				onSuccess={onSuccess}
				onFailure={onFailure}
				clientId={googleClientID}
				cookiePolicy={"single_host_origin"}
				/>
			</Box>
		</Container>
	)
}