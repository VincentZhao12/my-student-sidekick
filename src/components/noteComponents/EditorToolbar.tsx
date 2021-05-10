import { Flex, Icon, Spacer, useColorModeValue } from '@chakra-ui/react';
import { EditorState, RichUtils } from 'draft-js';
import React, { FC } from 'react';
import ToolbarButton from './ToolbarButton';
import { ReactComponent as NumberList } from '../../images/number_list.svg';
import { ReactComponent as BulletList } from '../../images/bullet_list.svg';

interface ToolbarProps {
    editorState: EditorState;
    changeEditorState: (state: EditorState) => void;
    focusEditor: () => void;
}

const EditorToolbar: FC<ToolbarProps> = ({
    editorState,
    changeEditorState,
    focusEditor,
}) => {
    const changeBlockType = (type: string) => {
        changeEditorState(RichUtils.toggleBlockType(editorState, type));
    };

    const changeInlineStyle = (type: string) => {
        const newState = RichUtils.toggleInlineStyle(editorState, type);
        focusEditor();
        changeEditorState(newState);
    };
    return (
        <Flex bg={useColorModeValue('gray.200', 'gray.600')}>
            <ToolbarButton
                label="Bold (Ctrl/Cmd + B)"
                onClick={() => changeInlineStyle('BOLD')}
                selected={editorState.getCurrentInlineStyle().includes('BOLD')}
            >
                <b>B</b>
            </ToolbarButton>
            <Spacer />
            <ToolbarButton
                label="Italic (Ctrl/Cmd + I)"
                onClick={() => changeInlineStyle('ITALIC')}
                selected={editorState
                    .getCurrentInlineStyle()
                    .includes('ITALIC')}
            >
                <i>I</i>
            </ToolbarButton>
            <Spacer />
            <ToolbarButton
                label="Underline (Ctrl/Cmd + U)"
                onClick={() => changeInlineStyle('UNDERLINE')}
                selected={editorState
                    .getCurrentInlineStyle()
                    .includes('UNDERLINE')}
            >
                <u>U</u>
            </ToolbarButton>
            <Spacer />
            <ToolbarButton
                label="Bullet Point List"
                onClick={() => changeBlockType('unordered-list-item')}
                selected={
                    RichUtils.getCurrentBlockType(editorState) ===
                    'unordered-list-item'
                }
            >
                <Icon
                    color={useColorModeValue('black', 'white')}
                    viewBox={'0 0 50 50'}
                    boxSize="6"
                >
                    <BulletList />
                </Icon>
            </ToolbarButton>
            <Spacer />
            <ToolbarButton
                label="Number List"
                onClick={() => changeBlockType('ordered-list-item')}
                selected={
                    RichUtils.getCurrentBlockType(editorState) ===
                    'ordered-list-item'
                }
            >
                <Icon
                    color={useColorModeValue('black', 'white')}
                    viewBox={'0 0 50 50'}
                    boxSize="6"
                >
                    <NumberList />
                </Icon>
            </ToolbarButton>
            <ToolbarButton
                label="Code Block"
                onClick={() => changeBlockType('code-block')}
                selected={
                    RichUtils.getCurrentBlockType(editorState) === 'code-block'
                }
            >
                <pre style={{ background: 'inherit' }}>{'{}'}</pre>
            </ToolbarButton>
        </Flex>
    );
};

export default EditorToolbar;
