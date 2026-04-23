import * as React from 'react';
import type { SchedulerEvent } from '@mui/x-scheduler/models';
import { EventCalendar } from '@mui/x-scheduler/event-calendar';




export default function DefaultView() {
    const [events, setEvents] = React.useState<SchedulerEvent[]>([]);



    React.useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/gettrainings")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching trainings..")
                return response.json();
            })
            .then(data => {
                const formattedEvents: SchedulerEvent[] = data.map((training: any) => ({
                    id: training.id, 
                    title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
                    start: new Date(training.date).toISOString(),
                    end: new Date(new Date(training.date).getTime() + training.duration * 60000).toISOString(), // lisää duration*millisekuntit durationin start aikaan jotta oikea end aika oikein
                }));
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
                    defaultPreferences={{ isSidePanelOpen: true, ampm:false, showWeekNumber:true }}
                    preferencesMenuConfig={{toggleAmpm:false, toggleWeekendVisibility:false}}
                    readOnly
                />
        </div>
    );
}