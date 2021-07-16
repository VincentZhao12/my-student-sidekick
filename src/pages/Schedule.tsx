import {
    Container,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    useDisclosure,
    useMediaQuery,
} from '@chakra-ui/react';
import FullCalendar, {
    DateSelectArg,
    EventClickArg,
} from '@fullcalendar/react';
import React, { FC } from 'react';
import { useEffect, useState } from 'react';
import EventInput from '../components/schedule-components/EventInput';
import { useAuth } from '../contexts/AuthContext';
import { db, messaging } from '../firebase';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import './Schedule.css';
import NeedAccount from './NeedAccount';
import { useRef } from 'react';

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
    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');
    const calendarRef = useRef<FullCalendar>(null);

    useEffect(() => {
        if (currentUser) {
            const setUpNotifications = async () => {
                try {
                    const [token, userDoc] = await Promise.all([
                        messaging.getToken(),
                        db.collection('users').doc(currentUser.uid).get(),
                    ]);

                    const tokens: string[] = userDoc.data()?.notificationTokens;

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
                                notificationTokens: [...tokens, token],
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

    useEffect(() => {
        if (
            !isLargerThan1000 &&
            calendarRef.current?.getApi().view.type === 'timeGridWeek'
        ) {
            calendarRef.current.getApi().changeView('timeGridDay');
        }
    }, [isLargerThan1000]);

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
        <Container centerContent marginBottom="10">
            <div
                style={{
                    height: '90vh',
                    width: '90vw',
                }}
            >
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today createEvent',
                        center: 'title',
                        right: `dayGridMonth${
                            isLargerThan1000 ? ',timeGridWeek' : ''
                        },timeGridDay`,
                    }}
                    initialView="dayGridMonth"
                    events={events}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    customButtons={{
                        createEvent: {
                            text: '+',
                            click: () => {
                                setSelectedEvent('');
                                setStart(new Date(Date.now()));
                                setEnd(new Date(Date.now() + 1000 * 60 * 60));
                                onOpen();
                            },
                        },
                    }}
                    buttonText={{
                        today: 'Today',
                        month: 'Month',
                        week: 'Week',
                        day: 'Day',
                    }}
                    select={handleSelect}
                    eventClick={handleEventSelect}
                    eventChange={(changeInfo) => {
                        const { start, end, id, title } = changeInfo.event;
                        const newEvent: Event = {
                            start: start || new Date(Date.now()),
                            end: end || new Date(Date.now() + 60 * 60 * 1000),
                            id,
                            title,
                        };

                        db.collection('users')
                            .doc(currentUser.uid)
                            .collection('events')
                            .doc(id)
                            .set({
                                ...newEvent,
                                notified1: Date.now() > (start?.getTime() || 0),
                                notified2:
                                    Date.now() >
                                    (start?.getTime() || 0) - 1000 * 60 * 60,
                                notified3:
                                    Date.now() >
                                    (start?.getTime() || 0) -
                                        1000 * 60 * 60 * 24,
                            });
                    }}
                />
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent
                    width={{
                        base: 'xs',
                        md: 'sm',
                        lg: 'md',
                    }}
                >
                    <ModalCloseButton />
                    <ModalHeader>Event</ModalHeader>
                    <ModalBody>
                        <EventInput
                            eventId={selectedEvent}
                            defaultStart={start}
                            defaultEnd={end}
                            onSubmit={onClose}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* <Button
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
            </Button> */}
        </Container>
    );
};

export default Schedule;
