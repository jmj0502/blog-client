export interface Blog {
	id: number;
	title: string;
	coverImg: string;
	content: string;
	authorId: number;
	author: Author;
	cratedAt: Date;
}

export interface Author {
	id: number;
	email: string;
}