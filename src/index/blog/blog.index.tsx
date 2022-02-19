import React, { useContext, useEffect } from "react";
import { BlogContext } from "./blog.context";
import { Blog } from "./blog.types";

export const BlogList: React.FC<{}> = () => {
	const {
		blogs, setBlogs, getBlogs
	} = useContext(BlogContext);

	const getBlogsData = async (): Promise<void> => {
		const blogData: Record<string, Blog[]> = await getBlogs("api/blog/");
		console.log(blogData);
		setBlogs(blogData);
	}

	useEffect(() => {
		getBlogsData();
	}, [])

	return ( 
		<div>
			{JSON.stringify(blogs)}
		</div>
	)
}