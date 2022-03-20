import React, { useContext, useEffect } from "react";
import { 
	Box, 
	Flex, 
	Heading, 
	Image,
	Text
} from "@chakra-ui/react";
import { BlogContext } from "./blog.context";
import { Blog } from "./blog.types";
import { DateTime } from "luxon";

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
	}, []);

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
				width="35%"
				direction="column"
			>
				{
					blogs.map((blog: Partial<Blog>) => {
						return (
							<Flex 
								key={blog.id}
								width="100%"
								height="60%"
								direction="column" 
								marginTop="10px"
								borderRadius="5px"
								borderWidth="1px"	
								boxShadow="md"
								bg="white"
							>
								<Image 
									src={blog.coverImg} 
									alt={blog.title} 
									height="60%"
									width="100%"
									borderTopRadius="5px"
								/>
								<Flex
									padding="5px"
								>
									<Box>
										<Image 
											src={blog.author?.profilePic}
											height="52px"
											width="52px"
											borderRadius="50%"
											marginLeft="20px"
										/>
									</Box>
									<Box
										marginLeft="15px"
										color="brand.200"
									>
										<Heading 
											size="lg"
											color="#000"
										>
												{blog.title}
										</Heading>
										<Text>Author: {blog.author?.fullName}</Text>
										<Text>
											{`${DateTime.fromISO(blog.createdAt as string).toLocaleString({...DateTime.DATE_FULL})}`}
										</Text>
									</Box>
								</Flex>
							</Flex>
						); 
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