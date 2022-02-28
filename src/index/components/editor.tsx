import React, { useCallback, useState } from "react";
import {
	Slate, 
	Editable, 
	withReact,
} from "slate-react";
import { 
	BaseEditor, 
	Descendant, 
	createEditor, 
} from 'slate'
import { ReactEditor } from 'slate-react'
import { Box } from "@chakra-ui/react";
import {
	HeadingElement,
	ParagraphElement,
	CustomText
} from "./editor.types";
import {
	formatMap,
	triggerCommands,
	Leaf,
	DefaultBlock	
} from "./editor.elements";


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
			triggerCommands(e, editor, command);
		}
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