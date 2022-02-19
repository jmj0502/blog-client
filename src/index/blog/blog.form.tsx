import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
		<div>
			<h2>Create Blog</h2>
			<form onSubmit={onFormSubmit}>
				<label htmlFor="title">Title</label>
				<input type="text" name="title" onChange={onFormFieldChange}/>
				<label htmlFor="coverImg">Cover Image</label>
				<input type="text" name="coverImg" onChange={onFormFieldChange}/>
				<label htmlFor="content">Content</label>
				<textarea name="content" />
				<button>
					Create Post
				</button>
			</form>
		</div>
	);
}