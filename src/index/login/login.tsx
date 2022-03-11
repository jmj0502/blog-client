import React from "react";
import { 
	Button, 
	Center, 
	Flex, 
	Heading, 
	Text 
} from "@chakra-ui/react";
import { 
	GoogleLoginResponse, 
	GoogleLoginResponseOffline, 
	useGoogleLogin 
} from "react-google-login";
import GoogleLogo from "../../assets/google-logo.svg";
import BlogLogo from "../../assets/Default.svg";
import { setAuth } from "./login.request";

export const Login: React.FC<{}> = () => {
	
	const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
		const response = res as GoogleLoginResponse;
		setAuth(`${process.env.REACT_APP_API}api/auth/sign-up`, response);
	}

	const onFailure = (res: any): void => {
		console.log("///// Error While Logging in ////");
		console.log(res);
		console.log("///// Error While Logging in ////");
	}

	const googleClientID: string = `${process.env.REACT_APP_GOOGLE_ID}`;

	const {signIn} = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId: googleClientID
	});
	

	return (
		<Center
			height="85vh"
			width="full"
			bg="gray.100"
		>
			<Flex
				bg="white"
				direction="column"
				width="30%"
				borderWidth="1px"
				borderRadius="5px"
				height="40%"
				textAlign="center"
				justifyContent="space-evenly"
				boxShadow="md"
			>
				<img 
					src={BlogLogo} 
					alt="Logo" 
					style={{
						height:"20%",
						marginBottom: "5px"
					}}
				/>
				<Heading as="h4">Welcome!</Heading>
				<Text>If you are ready to start spreading ideas, experiences and knowledge...</Text>
				<Button 
					style={{
						marginRight: "5px",
						marginLeft: "5px",
					}}
					onClick={signIn}
				>
					Sign In <img src={GoogleLogo} style={{height: "25px"}} alt="Google Logo"/> 
				</Button>
			</Flex>
		</Center>
	)
}