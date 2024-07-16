// ! Установить npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
// import '@fullcalendar/core/main.css'; // Импортируем основные стили FullCalendar
// import '@fullcalendar/daygrid/main.css'; // Импортируем стили DayGrid
// import '@fullcalendar/timegrid/main.css'; // Импортируем стили TimeGrid


const MyCalendar = () => {
  return (
    <div className="calendar-container">
      {" "}
      {/* Применяем стиль к родительскому контейнеру */}
      {/* <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        // Добавьте другие опции и события по мере необходимости
      /> */}
            {/* <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          initialDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
        />
      </div> */}
       <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        buttonText={{
          today: 'Сегодня',
          month: 'Месяц',
          // week: 'Неделя',
          // day: 'День'
        }}
        height="auto"
        contentHeight="auto"
      />
    </div>
  );
};

export default MyCalendar;

// ! 4 ВАРИАНТ от React Datepicker
// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { addDays } from 'date-fns';

// const MyDatePicker = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(null);
//   const onChange = (dates) => {
//     const [start, end] = dates;
//     setStartDate(start);
//     setEndDate(end);
//   };

//   return (
//     <DatePicker
//     selected={startDate}
//     onChange={onChange}
//     startDate={startDate}
//     endDate={endDate}
//     excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
//     selectsRange
//     selectsDisabledDaysInRange
//     inline
//   />
// );
// };

// export default MyDatePicker;

// ! 3 ВАРИАНТ от React Big Calendar (не особо симпатичный) = npm install react-big-calendar:
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import moment from 'moment';

// const localizer = momentLocalizer(moment);

// const MyCalendar = () => (
//   <div>
//     <Calendar
//       localizer={localizer}
//       events={[
//         {
//           title: 'Event',
//           start: new Date(),
//           end: new Date(),
//         },
//       ]}
//       startAccessor="start"
//       endAccessor="end"
//     />
//   </div>
// );

// export default MyCalendar;

// ! ОСТАВИТЬТ МОЖНО ЭТОТ (тоже норм):
// import React from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import moment from 'moment';
// const MyBigCalendar = () => {
//   const localizer = momentLocalizer(moment);

//   const events = [
//     {
//       title: 'Meeting',
//       start: new Date(2024, 5, 25, 10, 0),
//       end: new Date(2024, 5, 25, 12, 0),
//     },
//     // Добавьте больше событий по мере необходимости
//   ];

//   return (

//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         // style={{ height: '100%' }} // Добавляем закругленные углы
//       />

//   );
// };

// export default MyBigCalendar;

// ! 2 ВАРИАНТ: А ЭТО КРАСИВЫЙ КАЛЕНДАРЬ, НО СТРАНЦИА В ТУДУ ПЕРЕХОДИТ СРАЗУ С ОШИБКОЙ УВЫ (ошибка эта совсем не чинится и не только у меня похоже)
// import React, { useState } from "react";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar } from "react-modern-calendar-datepicker";

// const CalendarCard = () => {
//   const defaultValue = {
//     year: 2024,
//     month: 6,
//     day: 21,
//   };

//   const disabledDays = [
//     {
//       year: 2019,
//       month: 3,
//       day: 20,
//     },
//     {
//       year: 2019,
//       month: 3,
//       day: 21,
//     },
//     {
//       year: 2019,
//       month: 3,
//       day: 7,
//     }
//   ];

//   const [selectedDay, setSelectedDay] = useState(defaultValue);

//   const handleDisabledSelect = (disabledDay) => {
//     console.log('Tried selecting a disabled day', disabledDay);
//   };

//   return (
//     <Calendar
//       value={selectedDay}
//       onChange={setSelectedDay}
//       disabledDays={disabledDays}
//       onDisabledDayError={handleDisabledSelect}
//       shouldHighlightWeekends
//     />
//   );
// };

// export default CalendarCard;

//  ! ЭТО ПЕРВЫЙ ПРОСТОЙ ВАРИАНТ слишком:
// import React, { useEffect, useState } from 'react';
// import { Box, Text } from '@chakra-ui/react';
// // import axios from 'axios';

// const CalendarCard = () => {
//   const [date, setDate] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => setDate(new Date()), 60000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
//       <Text fontSize="lg">{date.toLocaleDateString()}</Text>
//       <Text>{date.toLocaleTimeString()}</Text>
//     </Box>
//   );
// };

// export default CalendarCard;
