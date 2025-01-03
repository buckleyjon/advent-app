import React, { useState } from 'react';
import { format, isWeekend } from 'date-fns';
import { useCalendarData } from '../hooks/useCalendarData';
import { CalendarWindow } from './CalendarWindow';
import { Navigation } from './Navigation';

export function Calendar() {
  const { settings, windows } = useCalendarData();
  const [openWindows, setOpenWindows] = useState<Set<string>>(new Set());

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0074CC' }}>
        <Navigation />
        <p className="text-white">Calendar not configured yet</p>
      </div>
    );
  }

  const workingDayWindows = windows.filter(window => 
    !isWeekend(new Date(window.date))
  );

  const sortedWindows = [...workingDayWindows].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  function handleWindowOpen(date: string) {
    setOpenWindows(new Set([...openWindows, date]));
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0074CC' }}>
      <div className="max-w-6xl mx-auto p-8 relative">
        <Navigation />
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          {settings.title}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {sortedWindows.map((window) => (
            <CalendarWindow
              key={window.date}
              date={new Date(window.date)}
              content={window.content}
              imageUrl={window.imageUrl}
              isOpen={openWindows.has(window.date)}
              onOpen={() => handleWindowOpen(window.date)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}