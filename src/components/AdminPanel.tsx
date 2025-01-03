import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalendarData } from '../hooks/useCalendarData';
import { useAuth } from '../hooks/useAuth';
import { WindowContent } from '../lib/storage';
import { Home, LogOut } from 'lucide-react';
import { SettingsForm } from './admin/SettingsForm';
import { WindowsList } from './admin/WindowsList';
import { DangerZone } from './DangerZone';
import { generateDateRange } from '../lib/dateUtils';

export function AdminPanel() {
  const navigate = useNavigate();
  const { settings, windows, updateSettings, updateWindows, loading } = useCalendarData();
  const { isAuthenticated, logout } = useAuth();
  const [startDate, setStartDate] = useState(settings?.startDate || '');
  const [endDate, setEndDate] = useState(settings?.endDate || '');
  const [title, setTitle] = useState(settings?.title || 'Advent Calendar');
  const [saved, setSaved] = useState(false);
  const [localWindows, setLocalWindows] = useState<WindowContent[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (windows.length > 0) {
      setLocalWindows(windows);
    }
  }, [windows]);

  useEffect(() => {
    if (settings) {
      setStartDate(settings.startDate);
      setEndDate(settings.endDate);
      setTitle(settings.title);
    }
  }, [settings]);

  async function handleSaveSettings() {
    try {
      await updateSettings({ startDate, endDate, title });
      
      const newWindows = generateDateRange(startDate, endDate);
      const existingContent = new Map(localWindows.map(w => [w.date, w]));
      const mergedWindows = newWindows.map(window => ({
        ...window,
        ...existingContent.get(window.date)
      }));

      setLocalWindows(mergedWindows);
      await updateWindows(mergedWindows);
      
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  function handleUpdateWindow(window: WindowContent, updates: Partial<WindowContent>) {
    const newWindows = localWindows.map(w => 
      w.date === window.date ? { ...w, ...updates } : w
    );
    setLocalWindows(newWindows);
    updateWindows(newWindows);
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            View Calendar
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <SettingsForm
        startDate={startDate}
        endDate={endDate}
        title={title}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onTitleChange={setTitle}
        onSave={handleSaveSettings}
        saved={saved}
      />

      {localWindows.length > 0 && (
        <WindowsList
          windows={localWindows}
          onUpdateWindow={handleUpdateWindow}
        />
      )}

      <div className="mt-8">
        <DangerZone />
      </div>
    </div>
  );
}