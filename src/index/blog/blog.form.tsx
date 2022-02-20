import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
	FormControl, 
	Input, 
	FormLabel,
	Flex, 
	Box,
	Heading,
	Button
} from "@chakra-ui/react";
import { BlogContext } from "./blog.context";
import { Blog } from "./blog.types";

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

	const onFormFieldChange = (e: React.FormEvent<HTMLInputElement>): void => {
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
		<Flex direction="column" alignItems="center">
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
				<FormControl width="container.md">
					<form onSubmit={onFormSubmit}>
						<FormLabel htmlFor="title" marginTop="1" fontSize="2xl">Title</FormLabel>
						<Input type="text" name="title" onChange={onFormFieldChange}/>
						<FormLabel htmlFor="coverImg" fontSize="2xl">Cover Image</FormLabel>
						<Input type="text" name="coverImg" onChange={onFormFieldChange}/>
						<FormLabel htmlFor="content" fontSize="2xl">Content</FormLabel>
						<textarea name="content" />
						<Button
						  type="submit"
						  background="submit.300"
						  color="white"
						  fontWeight="bold"
						>
							Create Post
						</Button>
					</form>
				</FormControl>
			</Box>
		</Flex>
	);
}