import React, { useState } from "react";
import { BlogContext } from "./blog.context";
import { Blog } from "./blog.types";

export const BlogState = ({children}: any) => {
	const [blogs, setBlogs] = useState<Partial<Blog[]>>([]);

	const getBlogs = async (endpoint: string): Promise<Partial<Blog[]>> => {
		console.log("ROUTE")
		console.log(`${process.env.REACT_APP_API}${endpoint}`);
		console.log("ROUTE")
		const blogsPromise = await fetch(`${process.env.REACT_APP_API}${endpoint}`, {
			method: "GET"	
		});
		const blogsData: Partial<Blog[]> = await blogsPromise.json();
		return blogsData;
	}

	const createBlog = async (endpoint: string, blogData: Omit<Blog, "id" | "author">, token: string): Promise<Record<string, boolean | Blog>> => {
		const responsePromise = await fetch(`${process.env.REACT_APP_API}${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "Application/JSON",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify(blogData)
		});
		const responseData: Record<string, boolean | Blog> = await responsePromise.json();
		return responseData;
	}

	return (
		<BlogContext.Provider
		value={{
			blogs, 
			setBlogs, 
			getBlogs,
			createBlog
		}}
		>
			{children}
		</BlogContext.Provider>
	)
}