import React from 'react';
import LocalCalendar from '../components/Calendar/LocalCalendar';

function CalendarView() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">My Calendar</h1>
        <p className="mt-2 text-blue-600/80">Track your special days! 📅</p>
      </header>

      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <LocalCalendar />
      </div>
    </div>
  );
}

export default CalendarView;