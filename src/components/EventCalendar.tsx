import * as React from 'react';
import type { SchedulerEvent } from '@mui/x-scheduler/models';
import { EventCalendar } from '@mui/x-scheduler/event-calendar';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import { fetchTrainings } from '../ptapi';



export default function DefaultView() {
    const [events, setEvents] = React.useState<SchedulerEvent[]>([]);



    React.useEffect(() => {
        fetchTrainings()
            .then(data => {
                const formattedEvents: SchedulerEvent[] = data.map((training: any) => {
                    const start = dayjs.utc(training.date);
                    const end = start.add(training.duration, "minute"); // lisää  duration minuutteina start aikaan
                    return {
                        id: training.id,
                        title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
                        start: start.format("YYYY-MM-DDTHH:mm"), // muotoilee pvm ja ajan
                        end: end.format("YYYY-MM-DDTHH:mm"),
                    };
                });
                setEvents(formattedEvents);
            })
            .catch(err => console.error(err));
    }, []);


    return (
        <div style={{ height: '650px', width: '100%' }}>
            <EventCalendar
                events={events}
                defaultVisibleDate={new Date()}
                onEventsChange={setEvents}
                defaultView="month"
                readOnly
                defaultPreferences={
                    { 
                        isSidePanelOpen: true,
                        ampm: false,
                        showWeekNumber: true 
                    }
                }
                preferencesMenuConfig={
                    {
                        toggleAmpm: false,
                        toggleWeekendVisibility: false
                    }
                }
            />
        </div>
    );
}