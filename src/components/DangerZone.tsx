import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { storage } from '../lib/storage';

export function DangerZone() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
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
          >
            Reset Application
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-red-600">Are you sure? This will delete all calendar data and cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowConfirm(false)}
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