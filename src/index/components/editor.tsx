import React, { useCallback, useState } from "react";
import {
	Slate, 
	Editable, 
	withReact,
	RenderElementProps,
	RenderLeafProps
} from "slate-react";
import { 
	BaseEditor, 
	Descendant, 
	createEditor, 
	Transforms, 
	Editor,
} from 'slate'
import { ReactEditor } from 'slate-react'
import { Box } from "@chakra-ui/react";
import {
	CustomEditor as CurrenEditor,
	HeadingElement,
	ParagraphElement,
	CustomText
} from "./editor.types";


declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: HeadingElement | ParagraphElement 
    Text: CustomText
  }
}

export const CustomEditor: React.FC<{}> = () => {

	const initialValue: Descendant[] = [{
		type: 'paragraph',
		children: [{text: 'Text'}]
	}];
	const [value, setValue] = useState<Descendant[]>(initialValue);
	const [editor] = useState(() => withReact(createEditor()));

	const isActiveMark = (editor: CurrenEditor, format: string): boolean => {
		const marks: any = Editor.marks(editor);
		return marks ? marks[format] === true : false;
	}

	const toggleMark = (editor: CurrenEditor, format: string): void => {
		const activeMark = isActiveMark(editor, format);
		if (activeMark) {
			Editor.removeMark(editor, format);
		} else {
			Editor.addMark(editor, format, true);
		}
	}

	//An abstraction that will allow us to apply any kind of mark to any piece of code based on 
	//the provided parameters. E.G: keyboardEvent, 'code' will trigger the code format.
	const triggerCommands = (e: React.KeyboardEvent, format: string): void => {
		e.preventDefault();
		toggleMark(editor, format);
	}

	//This map will allow us to map the keys that tigger our commands with the respective format
	//they apply into our text.
	const formatMap: Record<string, string> = {
		'`': 'code',
		'b': 'bold'
	}

	//handling keydown events within our wysiwyg.
	const onKeyDown = (e: React.KeyboardEvent): void => {
		//On this function, we'll take advantage of slate keydown events to introduce
		// a keyboard command that will allow us to turn on the code mode.
		if (!e.ctrlKey) {
			return;
		}
		console.log(e.key)

		if (e.key in formatMap) {
			const command = formatMap[e.key];	
			triggerCommands(e, command);
		}
			//keyMaps[e.key](e);
	}

	const DefaultBlock = (props: Element) => {
		return (
			<p {...props.attributes}>{props.children}</p>
		)
	}

	const Leaf = ({attributes, children, leaf}: RenderLeafProps) => {
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

		return (
			<span
				{...attributes}
			>
				{children}
			</span>
		)
	}

	//Here we'll define a rendering function based on the elements provided through props.
	//In this particular case, we'll use the useCallback hook to memoize the function for subsequent redings.
	const elementRenderer = useCallback((props) => {
		switch (props.element.type) {
			default:
				return <DefaultBlock {...props}/>
		}	
	}, [])

	//Since leaves must have a renderer of their own let's create one.
	const leafRenderer = useCallback((props) => {
		return <Leaf {...props}/>
	}, []);

	return (
		<Slate 
			editor={editor}
			value={value}
			onChange={(newValue) => { 
				console.log(JSON.stringify(newValue))
				setValue(newValue)
			}} 
		>
		<Box border="1px" borderRadius="5px">
			<Editable 
				onKeyDown={onKeyDown}
				renderLeaf={leafRenderer}
				renderElement={elementRenderer}
				placeholder="write" style={{minHeight: "150px", resize: "vertical", overflow: "auto"}} 
			/>
		</Box>
		</Slate>
	);
}