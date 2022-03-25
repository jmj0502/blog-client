import React, { 
	useContext, 
	useState 
} from "react";
import { BlogContext } from "./blog.context";
import { Blog } from "./blog.types";
import { LoginContext } from "../login/login.context";
import { LoggedUser } from "../login/login.types";

export const BlogState = ({children}: any) => {

	const {
		getCurrentUser
	} = useContext(LoginContext);

	const [blogs, setBlogs] = useState<Partial<Blog[]>>([]);
	const [blog, setBlog] = useState<Partial<Blog>>({});

	const getBlogs = async (): Promise<Partial<Blog[]>> => {
		const blogsPromise = await fetch(`${process.env.REACT_APP_API}api/blog/`, {
			method: "GET"	
		});
		const blogsData: Partial<Blog[]> = await blogsPromise.json();
		return blogsData;
	}
	
	const getBlog = async (id: number): Promise<Partial<Blog>> => {
		const user: LoggedUser = getCurrentUser();
		const blogPromise = await fetch(`${process.env.REACT_APP_API}api/blog/${id}`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${user.token}`
			}	
		});
		const blogData: Partial<Blog> = await blogPromise.json();
		return blogData;
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
			blog,
			setBlog,
			getBlog,
			createBlog
		}}
		>
			{children}
		</BlogContext.Provider>
	)
}