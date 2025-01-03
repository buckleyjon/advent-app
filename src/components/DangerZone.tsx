import React, { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function DangerZone() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    try {
      setIsResetting(true);

      // Delete all calendar windows
      await supabase
        .from('calendar_windows')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      // Delete all calendar settings
      await supabase
        .from('calendar_settings')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      // Delete all storage objects
      const { data: files } = await supabase.storage
        .from('calendar-images')
        .list();

      if (files?.length) {
        await supabase.storage
          .from('calendar-images')
          .remove(files.map(file => file.name));
      }

      // Clear local storage
      localStorage.clear();

      // Reload the page
      window.location.href = '/';
    } catch (error) {
      console.error('Error resetting application:', error);
      alert('Error resetting application. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
      <h3 className="text-xl font-semibold text-red-700 flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5" />
        Danger Zone
      </h3>
      
      <div className="space-y-4">
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            disabled={isResetting}
          >
            Reset Application
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-red-600">Are you sure? This will delete all calendar data and cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                disabled={isResetting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors inline-flex items-center gap-2"
              >
                {isResetting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  'Yes, Reset Everything'
                )}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isResetting}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}