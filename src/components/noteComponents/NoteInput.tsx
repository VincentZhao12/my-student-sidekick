import 'draft-js/dist/Draft.css';
import React, { FC, useEffect, useState } from 'react';
import { Container } from '@chakra-ui/layout';
import NoteEditor from './NoteEditor';
import { RawDraftContentState } from 'draft-js';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';

export interface NoteInputProps {
    noteId: string;
    onSave?: () => any;
    defaultData: any;
}

const NoteInput: FC<NoteInputProps> = ({ noteId, onSave, defaultData }) => {
    const [title, setTitle] = useState<string>('');
    const [rawEditorData, setRawEditorData] = useState<
        RawDraftContentState | any
    >();
    const [saved, setSaved] = useState<boolean>(true);
    const { loggedIn, currentUser } = useAuth();
    const [defaultValue, setDefaultValue] = useState();

    useEffect(() => {
        if (defaultData) {
            setDefaultValue(defaultData.noteData);
            setTitle(defaultData.title);
        }
    }, [defaultData]);

    const handleSave = () => {
        if (!loggedIn) {
            localStorage.setItem(
                `notes/${noteId}`,
                JSON.stringify({
                    title,
                    noteData: rawEditorData,
                    id: noteId,
                }),
            );
            let notes = [];
            try {
                notes = JSON.parse(localStorage.getItem('notes') || '');
            } catch (e) {}
            if (notes.length) {
                if (notes.indexOf(noteId) === -1) {
                    notes = [...notes, noteId];
                }
            } else {
                notes = [noteId];
            }

            localStorage.setItem('notes', JSON.stringify(notes));
        } else if (currentUser) {
            db.collection('users')
                .doc(currentUser.uid)
                .collection('notes')
                .doc(`${noteId}`)
                .set({
                    title,
                    noteData: rawEditorData,
                    id: noteId,
                })
                .catch((e) => console.log(e));
        }
        onSave && onSave();
    };

    return (
        <Container width="lg">
            <Input
                placeholder="Note Title"
                onChange={(e) => {
                    setSaved(false);
                    setTitle(e.target.value);
                }}
                value={title}
                width="inherit"
            />
            <NoteEditor
                defaultValue={defaultValue}
                onChange={(data) => {
                    setRawEditorData(data);
                    setSaved(false);
                }}
            />
            <Button
                disabled={saved}
                _focus={{ boxShadow: 'outline' }}
                onClick={() => {
                    setSaved(true);
                    handleSave();
                }}
                width="inherit"
            >
                Save
            </Button>
        </Container>
    );
};

export default NoteInput;
