import React from "react";
import { BlogList } from "./blog.index";
import { BlogState } from "./blog.state";

export const Blogs = (): JSX.Element => {
	return (
		<BlogState>
			<BlogList />
		</BlogState>
	)
}