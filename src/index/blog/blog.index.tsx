import React, { useContext, useEffect } from "react";
import { 
	Box, 
	Flex, 
	Heading, 
	Image,
} from "@chakra-ui/react";
import { BlogContext } from "./blog.context";
import { Blog } from "./blog.types";

export const BlogList: React.FC<{}> = () => {
	const {
		blogs, setBlogs, getBlogs
	} = useContext(BlogContext);

	const getBlogsData = async (): Promise<void> => {
		const blogData: Record<string, Blog[]> = await getBlogs("api/blog/");
		console.log(blogData);
		setBlogs(blogData.posts);
	}

	useEffect(() => {
		getBlogsData();
	}, [])

	return ( 
		<>
		<Flex 
			justifyContent="space-between"
		>
			<Flex 
				width="30%"
			>
			</Flex>
			<Flex 
				width="30%"
				direction="column"
			>
				{
					//blogs.forEach((el: Partial<Blog>) => console.log(el))
					//blogs.posts.map((el: Blog)=> console.log(el))
					blogs.map((blog: Partial<Blog>) => {
						console.log(blog);
						return (
							<Flex 
								width="100%"
								direction="column" 
								marginTop="10px"
								borderRadius="5px"
								borderWidth="1px"	
								justifyContent="center"
								boxShadow="md"
								bg="white"
							>
								<Image 
									src={blog.coverImg} 
									alt="coverImage" 
									height="200px"
									width="600px"
								/>
								<Box
									padding="5px"
								>
									<Heading size="lg">{blog.title}</Heading>
								</Box>
							</Flex>
						) 
					})
				}
			</Flex>
			<Flex 
				width="30%"
			>

			</Flex>
		</Flex>
		</>
	)
}