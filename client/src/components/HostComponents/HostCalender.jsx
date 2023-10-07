import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { addMonths } from "date-fns";
import React from 'react'
import interactionPlugin from "@fullcalendar/interaction";

function HostCalender({bookings,setDate}) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7)
    const nextYear = addMonths(startDate, 12);

    const getDate = (info) => {
     setDate(info.dateStr)
    }

  return (
    <FullCalendar
      plugins={[dayGridPlugin,interactionPlugin]}
      initialView="dayGridMonth"
      validRange={{ start: startDate, end: nextYear }}
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