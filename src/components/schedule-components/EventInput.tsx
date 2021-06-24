import { Stack, Button, FormControl, Input, FormLabel } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import 'react-datepicker/dist/react-datepicker.css';
import './EventInput.css';

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
    const [title, setTitle] = useState<string | undefined>();
    const [start, setStart] = useState<Date | undefined>();
    const [end, setEnd] = useState<Date | undefined>();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (eventId && currentUser) {
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
        }
    }, [eventId, currentUser, defaultStart, defaultEnd]);

    const createEvent = () => {
        if (eventId) {
            db.collection('users')
                .doc(currentUser?.uid)
                .collection('events')
                .doc(eventId)
                .set({
                    title: title || '',
                    start: start,
                    end: end,
                    id: eventId,
                })
                .then(onSubmit);
        } else {
            const doc = db
                .collection('users')
                .doc(currentUser?.uid)
                .collection('events')
                .doc();

            doc.set({
                title: title || '',
                start: start,
                end: end,
                id: doc.id,
            }).then(onSubmit);
        }
    };

    return (
        <Stack spacing={4}>
            <FormControl>
                <FormLabel>Event Title</FormLabel>
                <Input
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Start Time</FormLabel>
                <ReactDatePicker
                    onChange={(date) => {
                        if (!Array.isArray(date)) setStart(date || undefined);
                    }}
                    selected={start}
                    showTimeSelect
                    dateFormat="Pp"
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
                />
            </FormControl>
            <Button width="inherit" onClick={createEvent}>
                {eventId ? 'Edit' : 'Create'} Event
            </Button>
        </Stack>
    );
};

export default EventInput;
