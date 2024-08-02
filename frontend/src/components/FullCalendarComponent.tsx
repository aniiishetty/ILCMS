import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import DailyLogForm from './DailyLogForm'; // Import the DailyLogForm component
import '../styles/FullCalendarComponent.css';

const FullCalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Track the selected date

  const handleDateClick = (arg: any) => {
    const clickedDate = new Date(arg.dateStr);
    const today = new Date();
    const dayBefore = new Date(today);
    dayBefore.setDate(today.getDate() - 1);
    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(today.getDate() - 2);

    if (
      clickedDate.toDateString() === today.toDateString() ||
      clickedDate.toDateString() === dayBefore.toDateString() ||
      clickedDate.toDateString() === dayBeforeYesterday.toDateString()
    ) {
      // Set the selected date to display the form
      setSelectedDate(clickedDate);
    } else {
      // Clear selected date if a different date is clicked
      setSelectedDate(null);
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
    <div className="relative max-w-4xl mx-auto p-5 bg-gray-800 text-white rounded-lg shadow-lg">
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
        dayCellDidMount={dayCellDidMount}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        events={[
          // Define your events here
        ]}
      />
      {/* Render DailyLogForm as an overlay if a date is selected */}
      {selectedDate && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-10">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <h3 className="text-xl mb-4 text-gray-200">Daily Log for {selectedDate.toDateString()}</h3>
            <DailyLogForm aicteInternId={0} />
            <button 
              onClick={() => setSelectedDate(null)} 
              className="absolute top-4 right-4 text-gray-300 hover:text-white">
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullCalendarComponent;
