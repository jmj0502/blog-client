import React, { ReactElement } from "react";
import { 
	Editor, Element as SlateElement, Transforms
} from "slate";
import { 
	RenderLeafProps, 
	RenderElementProps,
	Slate, 
	useSlate 
} from "slate-react";
import { Heading, HStack, IconButton, ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react";
import {
	MdFormatBold,
	MdFormatItalic,
	MdFormatUnderlined,
	MdFormatStrikethrough,	
	MdFormatListBulleted,
	MdFormatListNumbered,
	MdFormatQuote,
	MdLooksOne,
	MdLooksTwo,
	MdCode
} from "react-icons/md";
import {
	CustomEditor as CurrenEditor,
	ToolBarIconProps
} from "./editor.types";

const listsBlocks = ['numbered-list', 'bulleted-list'];


//As isActiveMark allow us to check if a specific mark is active in order to apply a 
//certain style to a leaf, this logic will allow us to check if a specific format
//has been set into a block.
export const isActiveBlock = (editor: CurrenEditor, format: string): boolean => {
	const { selection } = editor;
	if (!selection) return false;

	const [match] = Array.from(
		Editor.nodes(
			editor,{
				at: Editor.unhangRange(editor, selection),
				match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
			}
		)
	);

	return !!match;
}

export const toggleBlock = (editor: CurrenEditor, format: string): void => {
	const isActive = isActiveBlock(editor, format);
	const isList = listsBlocks.includes(format);

	Transforms.unwrapNodes(editor, {
		match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && listsBlocks.includes(n.type),
		split: true
	});

	const newProperties: Partial<SlateElement> = {
		type: isActive ? "paragraph" : isList ? "list-item" : format
	}

	Transforms.setNodes(editor, newProperties);
	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
}

export const isActiveMark = (editor: CurrenEditor, format: string): boolean => {
	const marks: any = Editor.marks(editor);
	return marks ? marks[format] === true : false;
}

export const toggleMark = (editor: CurrenEditor, format: string): void => {
	const isActive = isActiveMark(editor, format);
	if (isActive) {
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

export const Block = ({attributes, children, element}: RenderElementProps) => {
	switch (element.type) {
		case 'numbered-list':
			return <OrderedList {...attributes}>{children}</OrderedList>
		case 'bulleted-list':
			return <UnorderedList {...attributes}>{children}</UnorderedList>
		case 'list-item':
			return <ListItem {...attributes}>{children}</ListItem>
		case 'quotation':
			return <blockquote 
						style={{
							marginLeft: "2px",
							paddingLeft: "10px",
							borderLeft: "3px solid #98c6e3"
						}}
						{...attributes}
					>
						{children}
					</blockquote>
		case 'heading-one': 
			return <Heading as='h1' size='3xl' {...attributes}>{children}</Heading>
		case 'heading-two':
			return <Heading as='h2' {...attributes}>{children}</Heading>
		default:
			return <p {...attributes}>{children}</p>
	}

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

const BlockButton: React.FC<ToolBarIconProps> = ({format, icon}: ToolBarIconProps) => {
	const editor = useSlate();
	return (
		<IconButton
			variant="outline"
			colorScheme="blue"
			isActive={isActiveBlock(editor, format)}
			onMouseDown={(event) => { 
				event.preventDefault();
				toggleBlock(editor, format)
			}}
			aria-label={format}
			icon={icon}
			borderWidth={0}
			fontSize={"25px"}
		/>
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
			<BlockButton format="heading-one" icon={<MdLooksOne />} />
			<BlockButton format="heading-two" icon={<MdLooksTwo />} />
			<BlockButton format="quotation" icon={<MdFormatQuote />} />
			<BlockButton format="numbered-list" icon={<MdFormatListNumbered/>} />
			<BlockButton format="bulleted-list" icon={<MdFormatListBulleted/>} />
		</HStack>
	)
}