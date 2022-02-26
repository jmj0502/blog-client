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
	Text 
} from 'slate'
import { ReactEditor } from 'slate-react'
import { Box } from "@chakra-ui/react";

type CustomElement = { type: 'paragraph' | 'code'; children: CustomText[] };
type CustomText = { text: string, bold?: boolean };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export const CustomEditor: React.FC<{}> = () => {

	const initialValue: CustomElement[] = [{
		type: 'paragraph',
		children: [{text: 'Text'}]
	}];
	const [value, setValue] = useState<Descendant[]>(initialValue);
	const [editor] = useState(() => withReact(createEditor()));

	const isActiveMark = (editor: Editor, mark: string, children: boolean = false): boolean => {
		if (children) {
			const [match] = Editor.nodes(editor, {
				match: (n: any) => n[mark] === true,
				universal: true
			});
			return !!match;
		}
		const [match] = Editor.nodes(editor, {
			match: (n: any) => n.type === mark
		});
		return !!match;
	}

	const codeCommand = (e: React.KeyboardEvent): void => {
		//This will prevent us to insert the character we're using
		//to trigger the command into the actual body of editor.
		e.preventDefault();
		const match = isActiveMark(editor, 'code');
		//Here we set the current selected block type to code.
		Transforms.setNodes(
			editor,
			{type: match ? 'paragraph' : 'code'},
			{match: (n: any) => Editor.isBlock(editor, n)}
		);
	}

	const boldCommand = (e: React.KeyboardEvent): void => {
		e.preventDefault();
		console.log("bold")
		//The logic contained on the match statement allows us to apply the changes to text nodes 
		//and split them from the rest of the string if the selection is overlaping
		// part of it.
		const match = isActiveMark(editor, 'bold', true);
		Transforms.setNodes(
			editor,
			{bold: match ? undefined : true},
			{match: (n: any) => n.text.length > -1, split: true}
		);
	}

	//This will map will allow us to deliver our keyboard commands on demmand.
	const keyMaps: Record<string, CallableFunction> = {
		'`': codeCommand,
		'b': boldCommand,
	}

	//handling keydown events within our wysiwyg.
	const onKeyDown = (e: React.KeyboardEvent): void => {
		//On this function, we'll take advantage of slate keydown events to introduce
		// a keyboard command that will allow us to turn on the code mode.
		if (!e.ctrlKey) {
			return;
		}
		console.log(e.key)

		if (e.key in keyMaps) 
			keyMaps[e.key](e);
	}

	//Defining custom elements to render inside our wysiwyg.
	//Slate allow us to basically provide other elements as props. 
	//By doing so, we can provide the props of our elements to our top-most element
	//and then pass every children to props as well.
	const CodeBlock = (props: RenderElementProps) => {
		return (
			<pre {...props.attributes} >
				<code>{props.children}</code>
			</pre>
		)
	}

	const DefaultBlock = (props: Element) => {
		return (
			<p {...props.attributes}>{props.children}</p>
		)
	}

	const Leaf = (props: RenderLeafProps) => {
		console.log(props.leaf.bold)
		return (
			<span
				{...props.attributes}
				style={{fontWeight: props.leaf.bold ? 'bold' : 'normal'}}
			>
				{props.children}
			</span>
		)
	}

	//Here we'll define a rendering function based on the elements provided through props.
	//In this particular case, we'll use the useCallback hook to memoize the function for subsequent redings.
	const elementRenderer = useCallback((props) => {
		switch (props.element.type) {
			case 'code':
				return <CodeBlock {...props}/>
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