import React, { useContext, useState } from "react";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { 
	FormControl, 
	Input, 
	FormLabel,
	Flex, 
	Box,
	Heading,
	Button,
	Link
} from "@chakra-ui/react";
import {
	ArrowBackIcon
} from "@chakra-ui/icons";
import { BlogContext } from "./blog.context";
import { Blog } from "./blog.types";
import { CustomEditor } from "../components/editor";

export const BlogForm: React.FC<{}> = () => {
	let navigate = useNavigate();

	const {
		createBlog	
	} = useContext(BlogContext);

	const [blog, setBlog] = useState<Partial<Blog>>({} as Partial<Blog>);
	const [validContent, setValidContent] = useState(false);

	const formValidator: Record<string, RegExp> = {
		title: /[a-zA-z\s]{5,}/,
		coverImg: /(http)(s)?\:\/\/[a-z0-9A-Z\.\/]{4,}/,
	}

	const onFormFieldChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		setBlog({[e.currentTarget.name]: e.currentTarget.value})
		setValidContent(formValidator[e.currentTarget.name].test(e.currentTarget.value));
	}

	const onFormSubmit = async (e: React.SyntheticEvent): Promise<void> => {
		e.preventDefault();
		
		if (!validContent) return;

		const result = await createBlog("api/blog/", blog);
		if (result.success) {
			console.log("SUCCESS");
			navigate("/");
		}
	}

	return (
		<Flex 
			direction="column" 
			alignItems="center" 
			width="full" 
			height="full"
			bg="gray.100"
		>
			<Flex direction="row" width="full">
				<Link as={ReactLink} to="/">
					<ArrowBackIcon marginTop="30px" marginLeft="30px" w="40px" h="31px" color="brand.1000"/>
				</Link>
			</Flex>
			<Box>
				<Heading 
					as="h2"
					fontSize="3xl"
					color="brand.900"
				>
					Create Blog
				</Heading>
			</Box>
			<Box>
				<FormControl width="container.md" marginTop="38px">
					<form onSubmit={onFormSubmit}>
						<FormLabel htmlFor="title" marginTop="1" fontSize="2xl">Title</FormLabel>
						<Input 
							type="text" 
							name="title" 
							onChange={onFormFieldChange} 
							placeholder="Some awesome title!"
							bg="white"
						/>
						<FormLabel marginTop="13px" htmlFor="coverImg" fontSize="2xl">Cover Image</FormLabel>
						<Input 
							type="text" 
							name="coverImg" 
							onChange={onFormFieldChange} 
							placeholder="E.G: http://exampleimg.com"
							bg="white"
						/>
						<FormLabel marginTop="13px" htmlFor="content" fontSize="2xl">Content</FormLabel>
						<CustomEditor />
						<Flex direction="row-reverse" width="full">
							<Button
							type="submit"
							background="submit.300"
							color="white"
							fontWeight="bold"
							marginTop="13px"
							alignSelf="end"
							>
								Create Post
							</Button>
						</Flex>
					</form>
				</FormControl>
			</Box>
		</Flex>
	);
}