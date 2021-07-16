import {
    Stack,
    Button,
    FormControl,
    Input,
    FormLabel,
    HStack,
    IconButton,
    Tooltip,
} from '@chakra-ui/react';
import React, { FC, SyntheticEvent, useState } from 'react';
import { useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import 'react-datepicker/dist/react-datepicker.css';
import './EventInput.css';
import { DeleteIcon } from '@chakra-ui/icons';

interface EventInputProps {
    defaultStart?: Date;
    defaultEnd?: Date;
    eventId?: string;
    onSubmit?: () => any;
}

const EventInput: FC<EventInputProps> = ({
    defaultStart,
    defaultEnd,
    eventId,
    onSubmit,
}) => {
    const [title, setTitle] = useState<string | undefined>('');
    const [start, setStart] = useState<Date | undefined>();
    const [end, setEnd] = useState<Date | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const { currentUser } = useAuth();
    let submitted = false;

    useEffect(() => {
        if (eventId && currentUser && !submitted) {
            db.collection('users')
                .doc(currentUser.uid)
                .collection('events')
                .doc(eventId)
                .onSnapshot((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        setTitle(data?.title);
                        setStart(data?.start.toDate());
                        setEnd(data?.end.toDate());
                    }
                });
        } else {
            setStart(defaultStart);
            setEnd(defaultEnd);
            setTitle('');
        }
    }, [eventId, currentUser, defaultStart, defaultEnd, submitted]);

    const createEvent = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        if (start && end && title) {
            if (eventId) {
                await db
                    .collection('users')
                    .doc(currentUser?.uid)
                    .collection('events')
                    .doc(eventId)
                    .set({
                        title: title || '',
                        start: start,
                        end: end,
                        id: eventId,
                        notified1: Date.now() > start.getTime(),
                        notified2:
                            Date.now() > start.getTime() - 1000 * 60 * 60,
                        notified3:
                            Date.now() > start.getTime() - 1000 * 60 * 60 * 24,
                    });
            } else {
                const doc = db
                    .collection('users')
                    .doc(currentUser?.uid)
                    .collection('events')
                    .doc();

                await doc.set({
                    title: title || '',
                    start: start,
                    end: end,
                    id: doc.id,
                    notified1: Date.now() > start.getTime(),
                    notified2: Date.now() > start.getTime() - 1000 * 60 * 60.0,
                    notified3:
                        Date.now() > start.getTime() - 1000 * 60 * 60 * 24,
                });
            }
            setLoading(false);
            onSubmit && onSubmit();
            submitted = true;
        }
    };

    const handleDelete = () => {
        if (eventId) {
            db.collection('users')
                .doc(currentUser?.uid)
                .collection('events')
                .doc(eventId)
                .delete()
                .then(onSubmit)
                .catch((e) => console.log(e));
        } else {
            onSubmit && onSubmit();
        }
    };

    return (
        <form onSubmit={createEvent}>
            <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Event Title</FormLabel>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Start Time</FormLabel>
                    <ReactDatePicker
                        onChange={(date) => {
                            if (!Array.isArray(date))
                                setStart(date || undefined);
                        }}
                        selected={start}
                        showTimeSelect
                        dateFormat="Pp"
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>End Time</FormLabel>
                    <ReactDatePicker
                        onChange={(date) => {
                            if (!Array.isArray(date)) setEnd(date || undefined);
                        }}
                        selected={end}
                        showTimeSelect
                        dateFormat="Pp"
                        required
                    />
                </FormControl>
                <HStack width="inherit">
                    <Button
                        width="lg"
                        colorScheme="primary"
                        type="submit"
                        isLoading={loading}
                    >
                        {eventId ? 'Edit' : 'Create'} Event
                    </Button>
                    <Tooltip label="Delete Event">
                        <IconButton
                            aria-label="Delete Event"
                            icon={<DeleteIcon />}
                            colorScheme="danger"
                            onClick={handleDelete}
                        />
                    </Tooltip>
                </HStack>
            </Stack>
        </form>
    );
};

export default EventInput;
