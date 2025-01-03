import { format, addDays, isBefore, isEqual, isWeekend } from 'date-fns';
import { WindowContent } from './storage';

export function generateDateRange(startDate: string, endDate: string): WindowContent[] {
  const windows: WindowContent[] = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (isBefore(currentDate, end) || isEqual(currentDate, end)) {
    if (!isWeekend(currentDate)) {
      windows.push({
        date: format(currentDate, 'yyyy-MM-dd'),
        content: '',
      });
    }
    currentDate = addDays(currentDate, 1);
  }

  return windows;
}

export function filterWeekends(windows: WindowContent[]): WindowContent[] {
  return windows.filter(window => !isWeekend(new Date(window.date)));
}