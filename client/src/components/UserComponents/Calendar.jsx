import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { addMonths } from "date-fns";

const Calendar = ({ place }) => {
  const today = new Date();
  const nextYear = addMonths(today, 12);
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      validRange={{ start: today, end: nextYear }}
      events={place.map((booking) => ({
        title: "Booked",
        start: new Date(booking.checkIn).toISOString().split("T")[0],
        end: new Date(booking.checkOut).toISOString().split("T")[0],
        allDay: true,
        backgroundColor: "red",
      }))}
    />
  );
};

export default Calendar;
