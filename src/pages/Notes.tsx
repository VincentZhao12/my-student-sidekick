import { AddIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Container, VStack } from '@chakra-ui/layout';
import {
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    useDisclosure,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import NoteInput from '../components/note-components/NoteInput';
import NotesDisplay from '../components/note-components/NotesDisplay';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

export interface NotesProps {}

const Notes: FC<NotesProps> = () => {
    const [notes, setNotes] = useState<any[]>([]);
    const { currentUser, loggedIn } = useAuth();
    const [selectedNote, setSelectedNote] = useState(0);
    const [dummy, setDummy] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (!loggedIn) {
            let notes = JSON.parse(localStorage.getItem('notes') || '[]');

            let newNotes: any[] = [];

            let data = notes.map((note: any) => {
                const val = localStorage.getItem(`notes/${note}`);
                if (val !== null) {
                    newNotes.push(note);
                    return JSON.parse(val);
                } else return undefined;
            });

            data = [...data].filter((data) => data !== undefined);
            localStorage.setItem('notes', JSON.stringify(newNotes));

            setNotes(data);
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

    const deleteNote = (index: number) => {
        if (index < notes.length) {
            if (currentUser) {
                try {
                    db.collection('users')
                        .doc(currentUser.uid)
                        .collection('notes')
                        .doc(notes[index].id)
                        .delete();
                } catch (e) {
                    console.log(notes);
                    let newNotes = [...notes];
                    newNotes.splice(index, 1);
                    setNotes(newNotes);
                }
            } else {
                localStorage.removeItem(`notes/${notes[index].id}`);
                let newNotes = [...notes];
                newNotes.splice(index, 1);
                localStorage.setItem(
                    'notes',
                    JSON.stringify(newNotes.map((note) => note.id)),
                );
                setDummy(dummy * -1);
            }

            setSelectedNote(index - 1);
        }
    };

    return (
        <Container flexDirection="row" display="flex" justifyContent="center">
            <NoteInput
                defaultData={
                    notes[selectedNote] ? notes[selectedNote] : undefined
                }
                noteId={
                    notes[selectedNote] ? notes[selectedNote].id : Date.now()
                }
                onSave={() => setDummy(-dummy)}
            />
            <Menu onClose={onClose}>
                <MenuButton
                    as={IconButton}
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: !isOpen ? 'none' : 'inherit' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <MenuList>
                    <VStack>
                        <NotesDisplay
                            noteTitles={notes.map((note) => note.title)}
                            selectedIndex={selectedNote}
                            onIndexChange={setSelectedNote}
                        />
                        <Button width="3xs" onClick={createNewNote} opacity={1}>
                            <AddIcon marginRight={'1.5'} /> Create New Note
                        </Button>
                    </VStack>
                </MenuList>
            </Menu>

            <VStack width="lg" display={{ base: 'none', md: 'flex' }}>
                <NotesDisplay
                    noteTitles={notes.map((note) => note.title)}
                    selectedIndex={selectedNote}
                    onIndexChange={setSelectedNote}
                    onDelete={deleteNote}
                />
                <Button
                    width="2xs"
                    onClick={createNewNote}
                    colorScheme="secondary"
                    variant="outline"
                >
                    <AddIcon marginRight={'1.5'} /> Create New Note
                </Button>
            </VStack>
        </Container>
    );
};

export default Notes;
