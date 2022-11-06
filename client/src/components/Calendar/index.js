import React from "react";
import { useQuery } from "@apollo/client";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { QUERY_EVENTS } from "../../utils/queries";
import format from "date-fns/format";
import parse from 'date-fns/parse';
import startOfWeek from "date-fns/startOfWeek";
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import CalendarInput from "../CalendarInput";


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
    
    const { loading, data } = useQuery(QUERY_EVENTS);
    
    const events = data?.events || [];

    if (loading) {
        return <div>Loading</div>;
    }

    return (
        
        <div>
            <CalendarInput />
            <div>
                <Calendar 
                localizer={localizer} 
                events={events}
                titleAccessor="eventTitle"
                desc="desc"
                startAccessor="start" 
                endAccessor="end" 
                views={['month', 'week']}
                style={{height: 500, margin: "50px"}} />
            </div>
        </div>
    )
} 

export default OrgCalendar;