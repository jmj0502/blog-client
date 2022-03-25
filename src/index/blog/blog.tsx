import React, { 
	useState,
	useEffect,
	useContext,
} from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "./blog.context";

export const Blog: React.FC<{}> =  () => {
	const params = useParams();
	const blogId = params.blogId as string;

	const {
		blog,
		setBlog,
		getBlog
	} = useContext(BlogContext);

	const getBlogData = async (blogId: number) => {
		const blog = await getBlog(blogId);
		console.log("//// Blog Data ////");
		console.log(blog);
		console.log("//// Blog Data ////");
		setBlog(blog);
	}

	useEffect(() => {
		getBlogData(parseInt(blogId));
	}, [])

	return (
		<>
		{ JSON.stringify(blog)  }
		</>
	)
}