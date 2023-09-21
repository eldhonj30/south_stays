import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { addMonths } from "date-fns";
import React from 'react'
import interactionPlugin from "@fullcalendar/interaction";

function HostCalender({bookings,setDate}) {
    const today = new Date();
    const nextYear = addMonths(today, 12);

    const getDate = (info) => {
     setDate(info.dateStr)
    }

  return (
    <FullCalendar
      plugins={[dayGridPlugin,interactionPlugin]}
      initialView="dayGridMonth"
      validRange={{ start: today, end: nextYear }}
      events={bookings.map((booking) => ({
        title: booking.status,
        start: new Date(booking.checkIn).toISOString().split("T")[0],
        end: new Date(booking.checkOut).toISOString().split("T")[0],
        allDay: true,
        backgroundColor: "red",
      }))}
     dateClick={getDate}
    />
  );
}

export default HostCalender;