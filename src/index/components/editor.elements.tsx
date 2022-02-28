import React, { ReactElement } from "react";
import { Editor } from "slate";
import { RenderLeafProps, useSlate } from "slate-react";
import { HStack, IconButton, Text } from "@chakra-ui/react";
import {
	MdFormatBold,
	MdFormatItalic,
	MdFormatUnderlined,
	MdFormatStrikethrough,	
	MdCode
} from "react-icons/md";
import {
	CustomEditor as CurrenEditor,
	ToolBarIconProps
} from "./editor.types";

export const isActiveMark = (editor: CurrenEditor, format: string): boolean => {
	const marks: any = Editor.marks(editor);
	return marks ? marks[format] === true : false;
}

export const toggleMark = (editor: CurrenEditor, format: string): void => {
	const activeMark = isActiveMark(editor, format);
	if (activeMark) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
}

//An abstraction that will allow us to apply any kind of mark to any piece of code based on 
//the provided parameters. E.G: keyboardEvent, 'code' will trigger the code format.
export const triggerCommands = (e: React.KeyboardEvent, editor: CurrenEditor, format: string): void => {
	e.preventDefault();
	toggleMark(editor, format);
}

//This map will allow us to map the keys that tigger our commands with the respective format
//they apply into our text.
export const formatMap: Record<string, string> = {
	'`': 'code',
	'b': 'bold',
	'u': 'underline',
	'i': 'italic',
	's': 'strike'
}

export const DefaultBlock = (props: Element) => {
	return (
		<p {...props.attributes}>{props.children}</p>
	)
}

export const Leaf = ({attributes, children, leaf}: RenderLeafProps) => {
	console.log(leaf)
	if (leaf.bold) {
		children = <strong>{children}</strong>
	}

	if (leaf.code) {
		children = <code style={{
			backgroundColor:'#adaba5', 
			borderRadius: '5px',
			color: '#fff'
		}}>{children}</code>
	}

	if (leaf.underline) {
		children = <Text as='u'>{children}</Text>
	}

	if (leaf.italic) {
		children = <Text as='i'>{children}</Text>
	}

	if (leaf.strike) {
		children = <Text as='s'>{children}</Text>
	}

	return (
		<span
			{...attributes}
		>
			{children}
		</span>
	)
}

const MarkButton: React.FC<ToolBarIconProps> = ({format, icon}: ToolBarIconProps) => {
	const editor = useSlate();
	return (
		<IconButton
			variant="outline"
			colorScheme="blue"
			isActive={isActiveMark(editor, format)}
			onMouseDown={(event) => { 
				event.preventDefault();
				toggleMark(editor, format)
			}}
			aria-label={format}
			icon={icon}
			borderWidth={0}
			fontSize={"25px"}
		/>
	)
}

export const Toolbar: React.FC<{}> = () => {
	return (
		<HStack
			borderWidth={"0 0 1px 0"}
			padding={"10px 5px"}
			spacing={"5px"}
			wrap={"wrap"}
		>
			<MarkButton format="bold" icon={<MdFormatBold />} />
			<MarkButton format="italic" icon={<MdFormatItalic />} />
			<MarkButton format="underline" icon={<MdFormatUnderlined />} />
			<MarkButton format="strike" icon={<MdFormatStrikethrough />} />
			<MarkButton format='code' icon={<MdCode />} />
		</HStack>
	)
}