import {
    Button,
    Container,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    useDisclosure,
} from '@chakra-ui/react';
import FullCalendar, {
    DateSelectArg,
    EventClickArg,
} from '@fullcalendar/react';
import React, { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import EventInput from '../components/schedule-components/EventInput';
import { useAuth } from '../contexts/AuthContext';
import { db, messaging } from '../firebase';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import './Schedule.css';
import NeedAccount from './NeedAccount';

interface Event {
    title: string;
    start: Date;
    end: Date;
    id?: string;
}

interface ScheduleProps {}

const Schedule: FC<ScheduleProps> = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<string>();
    const [start, setStart] = useState<Date>();
    const [end, setEnd] = useState<Date>();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            const setUpNotifications = async () => {
                try {
                    const [token, userDoc] = await Promise.all([
                        messaging.getToken(),
                        db.collection('users').doc(currentUser.uid).get(),
                    ]);

                    const tokens = userDoc.data()?.notificationTokens;

                    if (!tokens)
                        db.collection('users')
                            .doc(currentUser.uid)
                            .update({
                                notificationTokens: [token],
                            });
                    else if (tokens.indexOf(token) === -1) {
                        db.collection('users')
                            .doc(currentUser.uid)
                            .update({
                                notificationTokens: [token],
                            });
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            setUpNotifications();
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

    const handleSelect = (selection: DateSelectArg) => {
        setStart(selection.start);
        setEnd(selection.end);
        setSelectedEvent('');

        onOpen();
    };

    const handleEventSelect = (event: EventClickArg) => {
        setSelectedEvent(event.event.id);
        onOpen();
    };

    if (!currentUser) return <NeedAccount />;
    return (
        <Container centerContent>
            <div
                style={{
                    height: '90vh',
                    width: '90vw',
                }}
            >
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    initialView="dayGridMonth"
                    events={events}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    buttonText={{
                        today: 'Today',
                        month: 'Month',
                        week: 'Week',
                        day: 'Day',
                    }}
                    select={handleSelect}
                    eventClick={handleEventSelect}
                />
            </div>

            <Popover isOpen={isOpen} onClose={onClose}>
                <PopoverContent
                    width={{
                        base: 'xs',
                        md: 'sm',
                        lg: 'md',
                    }}
                >
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
            <Button
                width="inherit"
                onClick={() => {
                    setSelectedEvent('');
                    setStart(new Date(Date.now()));
                    setEnd(new Date(Date.now() + 1000 * 60 * 60));
                    onOpen();
                }}
                marginTop="10"
                colorScheme="secondary"
                variant="outline"
                marginBottom="10"
                fontSize="xl"
                height="24"
            >
                Create Event
            </Button>
        </Container>
    );
};

export default Schedule;
