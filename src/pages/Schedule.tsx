import { Container } from '@chakra-ui/react';
import moment from 'moment';
import React, { FC } from 'react';
import { useState } from 'react';
// import DayView from '../components/schedule-components/DayView';
import { Calendar, Event, momentLocalizer } from 'react-big-calendar';
import './Schedule.css';

interface ScheduleProps {}

const localizer = momentLocalizer(moment);

const Schedule: FC<ScheduleProps> = () => {
    const [events, setEvents] = useState<Event[]>([]);

    return (
        <Container centerContent width="container.xl">
            <Calendar
                localizer={localizer}
                events={[]}
                startAccessor="start"
                endAccessor="end"
                onSelectSlot={(s) => console.log(s)}
                selectable
            />
        </Container>
    );
};

export default Schedule;
