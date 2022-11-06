import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { QUERY_EVENTS } from "../../utils/queries";

const CalendarInput = () => {

    const [addEvent] = useMutation(ADD_EVENT, {
        update(cache, { data: { addEvent }}) {
            const { events } = cache.readQuery({ query: QUERY_EVENTS });

            cache.writeQuery({ 
                query: QUERY_EVENTS,
                data: { events: [addEvent, ...events] }
            })
        }
    })
    
    let [newEvent, setNewEvent] = useState({eventTitle: "", start: "", end: ""})

    const handleAddEvent = async event => {
        event.preventDefault();

        try{
            await addEvent({
                variables: { ...newEvent }
            });
            
            newEvent = ({eventTitle: "", start: "", end: ""});
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
        <div>
            <input type='text' placeholder='Add an Event' 
                value={newEvent.eventTitle} onChange={(e) => setNewEvent( {...newEvent, eventTitle: e.target.value} ) }
            />
            <DatePicker placeholderText="Start Date"
                selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />
            <DatePicker placeholderText="End Date"
                selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})} />
            <button onClick={handleAddEvent}>Add Event</button>
        </div>
        </>
    );
};

export default CalendarInput;