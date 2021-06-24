import {
    Container,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Calendar, Event, momentLocalizer } from 'react-big-calendar';
import EventInput from '../components/schedule-components/EventInput';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Schedule.css';
import NeedAccount from './NeedAccount';

interface ScheduleProps {}

const localizer = momentLocalizer(moment);

const Schedule: FC<ScheduleProps> = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<string>();
    const [start, setStart] = useState<Date>();
    const [end, setEnd] = useState<Date>();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            db.collection('users')
                .doc(currentUser.uid)
                .collection('events')
                .onSnapshot((collection) => {
                    setEvents(
                        collection.docs.map((doc) => {
                            const data = doc.data();
                            return {
                                title: data.title,
                                start: data.start.toDate(),
                                end: data.end.toDate(),
                                id: data.id,
                            };
                        }),
                    );
                });
        }
    }, [currentUser]);

    if (!currentUser) return <NeedAccount />;
    return (
        <Container centerContent width="container.xl">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectSlot={(s) => {
                    if (typeof s.start !== 'string') setStart(s.start);
                    if (typeof s.end !== 'string') setEnd(s.end);
                    onOpen();
                }}
                selectable
                onSelectEvent={(e: any) => {
                    onOpen();
                    setSelectedEvent(e.id);
                }}
            />
            <Popover isOpen={isOpen} onClose={onClose}>
                <PopoverContent width="lg">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Event</PopoverHeader>
                    <PopoverBody>
                        <EventInput
                            eventId={selectedEvent}
                            defaultStart={start}
                            defaultEnd={end}
                            onSubmit={onClose}
                        />
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Container>
    );
};

export default Schedule;
