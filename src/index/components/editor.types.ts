import { ReactElement } from "react";
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export type CustomEditor = BaseEditor & ReactEditor;

export type CustomText = {
	text: string;	
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strike?: boolean;
	code?: boolean;
};

export type ParagraphElement = {
	type: 'paragraph' | 'code' | 'list-item' | string;
	children: CustomText[];
};

export type HeadingElement = {
	type: 'heading';
	level: number;
	children: CustomText[];
}

export type ToolBarIconProps = {	
	format: string;
	icon: ReactElement;
}