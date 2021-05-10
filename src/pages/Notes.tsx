import { AddIcon } from '@chakra-ui/icons';
import { Container, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import NoteInput from '../components/noteComponents/NoteInput';
import NotesDisplay from '../components/noteComponents/NotesDisplay';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

export interface NotesProps {}

const Notes: FC<NotesProps> = () => {
    const [notes, setNotes] = useState<any[]>([]);
    const { currentUser, loggedIn } = useAuth();
    const [selectedNote, setSelectedNote] = useState(0);
    const [dummy, setDummy] = useState(0);

    useEffect(() => {
        if (!loggedIn) {
            const notes = JSON.parse(localStorage.getItem('notes') || '[]');
            setNotes(
                notes.map((note: any) =>
                    JSON.parse(localStorage.getItem(`notes/${note}`) || ''),
                ),
            );
        } else if (currentUser) {
            db.collection('users')
                .doc(currentUser.uid)
                .collection('notes')
                .onSnapshot((collection) => {
                    setNotes(collection.docs.map((doc) => doc.data()));
                });
        }
    }, [currentUser, loggedIn, dummy]);

    const createNewNote = () => {
        setNotes([
            ...notes,
            {
                title: '',
                noteData: undefined,
                id: Date.now(),
            },
        ]);
        setSelectedNote(notes.length);
    };

    return (
        <Container flexDirection="row" display="flex" justifyContent="center">
            <VStack width="lg">
                <NotesDisplay
                    noteTitles={notes.map((note) => note.title)}
                    selectedIndex={selectedNote}
                    onIndexChange={setSelectedNote}
                />
                <Button
                    width="3xs"
                    onClick={createNewNote}
                    style={{ marginTop: '4vh' }}
                >
                    <AddIcon marginRight={'1.5'} /> Add Note
                </Button>
            </VStack>

            <NoteInput
                defaultData={
                    notes[selectedNote] ? notes[selectedNote] : undefined
                }
                noteId={
                    notes[selectedNote] ? notes[selectedNote].id : Date.now()
                }
                onSave={() => setDummy(-dummy)}
            />
        </Container>
    );
};

export default Notes;
