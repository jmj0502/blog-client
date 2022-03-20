import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
	useToast,
	Button, 
	Center, 
	Flex, 
	Heading, 
	Text,
	Spinner
} from "@chakra-ui/react";
import { 
	GoogleLoginResponse, 
	GoogleLoginResponseOffline, 
	useGoogleLogin 
} from "react-google-login";
import { LoginContext } from "./login.context";
import GoogleLogo from "../../assets/google-logo.svg";
import BlogLogo from "../../assets/Default.svg";

export const Login: React.FC<{}> = () => {

	const [isLoading, setLoading] = useState(false);
	const {
		setAuth
	} = useContext(LoginContext); 

	const navigate = useNavigate();
	const toast = useToast();
	
	const onSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline): Promise<void | any> => {
		setLoading(true);
		const response = res as GoogleLoginResponse;
		const success = await setAuth(`${process.env.REACT_APP_API}api/auth/sign-up`, response);
		setLoading(false);
		if (!success) {
			return toast({
				title: "Something went wrong!",
				description: "Couldn't sign-in, please try again later.",
				status: 'error',
				duration: 3000,
				isClosable: true
			});
		}
		navigate("/");
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
				{isLoading ? 
					<Center>
						<Spinner size="lg" />  
					</Center>
					: 
					<Button 
						style={{
							marginRight: "5px",
							marginLeft: "5px",
						}}
						onClick={signIn}
					>
						Sign In <img src={GoogleLogo} style={{height: "25px"}} alt="Google Logo"/> 
					</Button> 
				}
			</Flex>
		</Center>
	)
}