import React, { 
	useState,
	useEffect,
	useContext,
} from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "./blog.context";
import { ReadonlyEditor } from "../components/editor.readonly";
import { Center, Flex } from "@chakra-ui/react";
import { Blog as BlogType } from "./blog.types";

export const Blog: React.FC<{}> =  () => {
	const params = useParams();
	const blogId = params.blogId as string;
	console.log(blogId);
	const [blog, setBlog] = useState<BlogType>();
	let isCurrent = true;
	
	async function getBlogData(blogId: number): Promise<void> {
		const blog = await getBlog(blogId);
		console.log("FIRED");
		setBlog(blog.post);
	}

	useEffect(() => {
		console.log("Test")
		if (isCurrent) {
			getBlogData(parseInt(blogId));
		}
		return () => {
			isCurrent = false;
		}
	}, [blog])

	const {
		getBlog
	} = useContext(BlogContext);


	return (
		<Flex
			alignItems="center"
			alignContent="center"
			bg="blue"
			textAlign="center"
			width={"100%"}
		>
			<Center
				width={"80%"}
				bg={"red"}
				margin="auto"
			>
				<p>;-/</p>
			</Center>
		</Flex>
	)
}