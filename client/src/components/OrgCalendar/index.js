import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from 'date-fns/parse';
import startOfWeek from "date-fns/startOfWeek";
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";


const OrgCalendar = () => {

    const locales = {
        "en-US": require('date-fns/locale/en-US')
    }
    
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    })
    
    const events = [
        {
            taskTitle: "John out",
            username: "John",
            allDay: true,
            start: new Date(2022, 10, 10),
            end: new Date(2022, 10, 12)
        },
        {
            taskTitle: "Hat Day",
            username: "William",
            allDay: true,
            start: new Date(2022, 10, 14),
            end: new Date(2022, 10, 20)
        },
    ]

    const [newEvent, setNewEvent] = useState({taskTitle: "", start: "", end: ""})
    const [allEvents, setAllEvents] = useState(events);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }

    return (
        <div>
            <div>
                <input type='text' placeholder='Add an Event' 
                    value={newEvent.taskTitle} onChange={(e) => setNewEvent( {...newEvent, taskTitle: e.target.value} ) }
                />
                <DatePicker placeholderText="Start Date"
                    selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />
                <DatePicker placeholderText="End Date"
                    selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})} />
                <button onClick={handleAddEvent}>Add Event</button>
            </div>
            <div>
                <Calendar localizer={localizer} events={allEvents}
                titleAccessor="taskTitle"
                startAccessor="start" 
                endAccessor="end" 
                views={['month', 'week']}
                style={{height: 500, margin: "50px"}} />
            </div>
        </div>
    )
} 

export default OrgCalendar;