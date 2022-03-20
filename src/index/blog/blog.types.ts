export interface Blog {
	id: number;
	title: string;
	coverImg: string;
	content: string;
	authorId: number;
	author: Author;
	createdAt: string;
}

export interface Author {
	id: number;
	email: string;
	profilePic: string;
	fullName: string;
}