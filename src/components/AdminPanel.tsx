import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalendarData } from '../hooks/useCalendarData';
import { useAuth } from '../hooks/useAuth';
import { WindowContent } from '../lib/storage';
import { format } from 'date-fns';
import { Home, LogOut } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { DangerZone } from './DangerZone';

export function AdminPanel() {
  const navigate = useNavigate();
  const { settings, windows, updateSettings, updateWindows } = useCalendarData();
  const { isAuthenticated, logout } = useAuth();
  const [startDate, setStartDate] = useState(settings?.startDate || '');
  const [endDate, setEndDate] = useState(settings?.endDate || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  function handleSaveSettings() {
    updateSettings({ startDate, endDate });
    
    const existingDates = new Set(windows.map(w => w.date));
    const newWindows = [...windows];
    
    let currentDate = new Date(startDate);
    const end = new Date(endDate);
    
    while (currentDate <= end) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      if (!existingDates.has(dateStr)) {
        newWindows.push({ date: dateStr, content: '' });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    updateWindows(newWindows);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  function handleUpdateWindow(window: WindowContent, updates: Partial<WindowContent>) {
    const newWindows = windows.map(w => 
      w.date === window.date ? { ...w, ...updates } : w
    );
    updateWindows(newWindows);
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <div className="flex gap-4">
          {saved && (
            <span className="text-green-600 flex items-center">
              Changes saved!
            </span>
          )}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Calendar</span>
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Calendar Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <button
            onClick={handleSaveSettings}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Settings
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Window Contents</h3>
          <div className="space-y-6">
            {windows.map((window) => (
              <div key={window.date} className="grid grid-cols-[1fr,2fr] gap-4">
                <div>
                  <p className="font-medium mb-2">
                    {format(new Date(window.date), 'MMM dd, yyyy')}
                  </p>
                  <ImageUpload 
                    onImageSelect={(imageUrl) => handleUpdateWindow(window, { imageUrl })}
                    currentImage={window.imageUrl}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Caption (optional)</label>
                  <input
                    type="text"
                    value={window.content}
                    onChange={(e) => handleUpdateWindow(window, { content: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Add a caption..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <DangerZone />
      </div>
    </div>
  );
}