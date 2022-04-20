import { 
	useCallback, 
	useState
} from "react";
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
import {
	Leaf,
	Block
} from "./editor.elements";
import { 
	HeadingElement,
	ParagraphElement,
	CustomText 
} from "./editor.types";
import { Center } from "@chakra-ui/react";

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: HeadingElement | ParagraphElement 
    Text: CustomText
  }
}

interface IReadonlyEditorProps {
	content: string 
}

export const ReadonlyEditor: React.FC<IReadonlyEditorProps> = ({ content }: IReadonlyEditorProps) => {

	//let initialValue = [{"type":"paragraph","children":[{"text":"Text "}]}];
	//if (content) {
	const initialValue = JSON.parse(content);
	//}
	const [value, setValue] = useState<Descendant[]>(initialValue);
	const [editor] = useState(() => withReact(createEditor()));

	const elementRenderer = useCallback((props) => {
		switch (props.element.type) {
			default:
				return <Block {...props}/>
		}	
	}, [])

	const leafRenderer = useCallback((props) => {
		return <Leaf {...props}/>
	}, []);

	return (
		<Slate
			editor={editor}
			value={value}
			onChange={setValue}
		>
			<Editable
				renderElement={elementRenderer}
				renderLeaf={leafRenderer}
				readOnly
			/>
		</Slate>
	)
}