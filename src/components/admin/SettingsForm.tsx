import React from 'react';
import { CalendarSettings } from '../../lib/storage';

interface SettingsFormProps {
  startDate: string;
  endDate: string;
  title: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  saved: boolean;
}

export function SettingsForm({ 
  startDate, 
  endDate,
  title,
  onStartDateChange, 
  onEndDateChange,
  onTitleChange,
  onSave,
  saved 
}: SettingsFormProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold mb-4">Calendar Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Calendar Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Advent Calendar"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Save Settings
        </button>
        {saved && (
          <p className="text-green-600 mt-2">Settings saved successfully!</p>
        )}
      </div>
    </div>
  );
}