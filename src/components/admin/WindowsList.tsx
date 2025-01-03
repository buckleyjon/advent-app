import React from 'react';
import { format } from 'date-fns';
import { WindowContent } from '../../lib/storage';
import { ImageUpload } from '../ImageUpload';
import { useWindowsState } from '../../hooks/useWindowsState';
import { filterWeekends } from '../../lib/dateUtils';

interface WindowsListProps {
  windows: WindowContent[];
  onUpdateWindow: (window: WindowContent, updates: Partial<WindowContent>) => void;
}

export function WindowsList({ windows, onUpdateWindow }: WindowsListProps) {
  const workingDayWindows = filterWeekends(windows);
  const { windows: localWindows, updateWindow } = useWindowsState(workingDayWindows);

  const handleContentChange = (window: WindowContent, content: string) => {
    updateWindow(window, { content }, onUpdateWindow);
  };

  const handleImageSelect = (window: WindowContent, imageUrl: string) => {
    updateWindow(window, { imageUrl }, onUpdateWindow);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Window Contents</h3>
      <div className="space-y-6">
        {localWindows.map((window) => (
          <div key={window.date} className="grid grid-cols-[1fr,2fr] gap-4">
            <div>
              <p className="font-medium mb-2">
                {format(new Date(window.date), 'MMM dd, yyyy')}
              </p>
              <ImageUpload 
                onImageSelect={(imageUrl) => handleImageSelect(window, imageUrl)}
                currentImage={window.imageUrl}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Caption (optional)</label>
              <input
                type="text"
                value={window.content || ''}
                onChange={(e) => handleContentChange(window, e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Add a caption..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}