import { useState, useEffect } from 'react';
import { storage, CalendarSettings, WindowContent } from '../lib/storage';

export function useCalendarData() {
  const [settings, setSettings] = useState<CalendarSettings | null>(null);
  const [windows, setWindows] = useState<WindowContent[]>([]);

  useEffect(() => {
    setSettings(storage.getSettings());
    setWindows(storage.getWindows());
  }, []);

  return {
    settings,
    windows,
    updateSettings: (newSettings: CalendarSettings) => {
      storage.saveSettings(newSettings);
      setSettings(newSettings);
    },
    updateWindows: (newWindows: WindowContent[]) => {
      storage.saveWindows(newWindows);
      setWindows(newWindows);
    }
  };
}