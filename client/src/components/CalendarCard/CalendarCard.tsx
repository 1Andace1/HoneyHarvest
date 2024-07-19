// ! Установить npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box, Text } from "@chakra-ui/react";
import "./MyCalendar.css"


const MyCalendar = () => {
  return (
    <Box bg="#C6F6D5" p={4} borderRadius="lg">
      <Text fontSize="2xl" color="gray.700" mb={4}>
        Календарь событий
      </Text>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title"
          }}
          buttonText={{
            today: "Сегодня",
            month: "Месяц",
            week: "Неделя",
            day: "День",
          }}
          height="auto"
          contentHeight="auto"
        />
      </div>
    </Box>
  );
};


export default MyCalendar;

