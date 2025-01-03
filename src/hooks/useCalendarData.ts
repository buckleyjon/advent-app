import { useState, useEffect } from 'react';
import { storage, CalendarSettings, WindowContent } from '../lib/storage';

export function useCalendarData() {
  const [settings, setSettings] = useState<CalendarSettings | null>(null);
  const [windows, setWindows] = useState<WindowContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        
        const [settingsData, windowsData] = await Promise.all([
          storage.getSettings(),
          storage.getWindows()
        ]);
        
        setSettings(settingsData);
        setWindows(windowsData);
      } catch (err) {
        setError('Failed to load calendar data');
        console.error('Error loading calendar data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const updateSettings = async (newSettings: CalendarSettings) => {
    try {
      setError(null);
      await storage.saveSettings(newSettings);
      setSettings(newSettings);
    } catch (err) {
      setError('Failed to update settings');
      throw err;
    }
  };

  const updateWindows = async (newWindows: WindowContent[]) => {
    try {
      setError(null);
      await storage.saveWindows(newWindows);
      setWindows(newWindows);
    } catch (err) {
      setError('Failed to update windows');
      throw err;
    }
  };

  return {
    settings,
    windows,
    loading,
    error,
    updateSettings,
    updateWindows
  };
}