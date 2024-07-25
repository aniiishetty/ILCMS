import React from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import '../styles/FullCalendarComponent.css';

const FullCalendarComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleDateClick = (arg: any) => {
    const clickedDate = new Date(arg.dateStr);
    const today = new Date();

    if (clickedDate.toDateString() === today.toDateString()) {
      navigate('/dailyLog');
    } else {
      const dayBefore = new Date(today);
      dayBefore.setDate(today.getDate() - 1);
      const dayBeforeYesterday = new Date(today);
      dayBeforeYesterday.setDate(today.getDate() - 2);

      if (
        clickedDate.toDateString() === dayBefore.toDateString() ||
        clickedDate.toDateString() === dayBeforeYesterday.toDateString()
      ) {
        navigate('/');
      } else {
        
      }
    }
  };

  const dayCellDidMount = (info: any) => {
    const cellDate = new Date(info.date);
    const today = new Date();
    const dayBefore = new Date(today);
    dayBefore.setDate(today.getDate() - 1);
    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(today.getDate() - 2);

    if (cellDate.toDateString() === today.toDateString()) {
      info.el.classList.add('today');
    } else if (cellDate.toDateString() === dayBefore.toDateString()) {
      info.el.classList.add('yesterday');
    } else if (cellDate.toDateString() === dayBeforeYesterday.toDateString()) {
      info.el.classList.add('day-before-yesterday');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4">My Custom FullCalendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        dateClick={handleDateClick}
        dayCellDidMount={dayCellDidMount} // Add this line
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        events={[
          // Define your events here
        ]}
      />
    </div>
  );
};

export default FullCalendarComponent;
