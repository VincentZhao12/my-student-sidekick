import 'draft-js/dist/Draft.css';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
    ContentBlock,
    convertFromRaw,
    convertToRaw,
    Editor,
    EditorState,
    getDefaultKeyBinding,
    Modifier,
    RawDraftContentState,
    RichUtils,
} from 'draft-js';
import { Container } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import EditorToolbar from './EditorToolbar';
import './Editor.css';

export interface NoteEditorProps {
    defaultValue?: any;
    onChange?: (rawData?: RawDraftContentState) => void;
}

const NoteEditor: FC<NoteEditorProps> = ({ defaultValue, onChange }) => {
    const [editorState, setEditorState] = useState<EditorState>(
        defaultValue
            ? EditorState.createWithContent(convertFromRaw(defaultValue))
            : EditorState.createEmpty(),
    );
    useEffect(() => {
        setEditorState(
            defaultValue
                ? EditorState.createWithContent(convertFromRaw(defaultValue))
                : EditorState.createEmpty(),
        );
    }, [defaultValue]);

    const editorRef = useRef<any>();

    const handleKeyCommand = (command: string, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (command === 'tab') return 'handled';

        if (newState) {
            setEditorState(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    const focusEditor = () => {
        editorRef.current.focus();
    };

    const decreaseBlockDepth = (block: ContentBlock) => {
        const blockKey = block.getKey();
        const depth = block.getDepth();
        const newBlock: any = block.set('depth', depth - 1);
        const contentState: any = editorState.getCurrentContent();
        const blockMap = contentState.getBlockMap();
        const newBlockMap = blockMap.set(blockKey, newBlock);
        return EditorState.push(
            editorState,
            contentState.merge({ blockMap: newBlockMap }),
            'adjust-depth',
        );
    };

    const insertStr = (str: string) => {
        const newEditorState = EditorState.push(
            editorState,
            Modifier.replaceText(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                str,
            ),
            'insert-characters',
        );

        setEditorState(newEditorState);
    };

    const keyBindings = (e: any) => {
        if (e.key === 'Tab') {
            if (
                RichUtils.getCurrentBlockType(editorState) ===
                    'unordered-list-item' ||
                RichUtils.getCurrentBlockType(editorState) ===
                    'ordered-list-item'
            ) {
                setEditorState(RichUtils.onTab(e, editorState, 4));
                return 'tab';
            } else {
                insertStr('\t');

                return 'tab';
            }
        }

        return getDefaultKeyBinding(e);
    };

    return (
        <Container
            bg={useColorModeValue('gray.100', 'gray.700')}
            padding={0}
            width="inherit"
        >
            <div
                style={{
                    padding: 20,
                    borderColor: useColorModeValue('gray.500', 'gray.50'),
                    borderStyle: 'solid',
                    borderWidth: 1,
                }}
            >
                <EditorToolbar
                    editorState={editorState}
                    changeEditorState={setEditorState}
                    focusEditor={focusEditor}
                />
                <div style={{ marginTop: '1vh' }}>
                    <Editor
                        ref={editorRef}
                        editorState={editorState}
                        handleKeyCommand={handleKeyCommand}
                        keyBindingFn={keyBindings}
                        handleReturn={(e, state) => {
                            const block = editorState
                                .getCurrentContent()
                                .getBlockMap()
                                .get(editorState.getSelection().getStartKey());
                            if (
                                !block.getText() &&
                                (block.getType() === 'unordered-list-item' ||
                                    block.getType() === 'ordered-list-item')
                            ) {
                                if (block.getDepth() > 0)
                                    setEditorState(decreaseBlockDepth(block));
                                else
                                    setEditorState(
                                        RichUtils.toggleBlockType(
                                            editorState,
                                            'unstyled',
                                        ),
                                    );
                                return 'handled';
                            }
                            return 'not-handled';
                        }}
                        onChange={(state) => {
                            onChange &&
                                onChange(
                                    convertToRaw(state.getCurrentContent()),
                                );

                            setEditorState(state);
                        }}
                        placeholder={
                            RichUtils.getCurrentBlockType(editorState) ===
                            'unstyled'
                                ? 'Start typing your note here'
                                : ''
                        }
                    />
                </div>
            </div>
        </Container>
    );
};

export default NoteEditor;
