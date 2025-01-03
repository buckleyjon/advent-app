import { useState, useCallback } from 'react';
import { WindowContent } from '../lib/storage';

export function useWindowsState(initialWindows: WindowContent[]) {
  const [windows, setWindows] = useState<WindowContent[]>(initialWindows);
  const [pendingUpdates, setPendingUpdates] = useState<Map<string, NodeJS.Timeout>>(new Map());

  const updateWindow = useCallback((window: WindowContent, updates: Partial<WindowContent>, onUpdate: (window: WindowContent, updates: Partial<WindowContent>) => void) => {
    // Clear any pending update for this window
    const pendingTimeout = pendingUpdates.get(window.date);
    if (pendingTimeout) {
      clearTimeout(pendingTimeout);
    }

    // Update local state immediately (optimistic update)
    setWindows(current => 
      current.map(w => w.date === window.date ? { ...w, ...updates } : w)
    );

    // Set a new timeout for the actual update
    const timeout = setTimeout(() => {
      onUpdate(window, updates);
      setPendingUpdates(current => {
        const next = new Map(current);
        next.delete(window.date);
        return next;
      });
    }, 500);

    setPendingUpdates(current => {
      const next = new Map(current);
      next.set(window.date, timeout);
      return next;
    });
  }, [pendingUpdates]);

  return {
    windows,
    setWindows,
    updateWindow
  };
}