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

    useEffect(() => console.log(isOpen), [isOpen]);

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
                />
                <Button width="3xs" onClick={createNewNote}>
                    <AddIcon marginRight={'1.5'} /> Create New Note
                </Button>
            </VStack>
        </Container>
    );
};

export default Notes;
