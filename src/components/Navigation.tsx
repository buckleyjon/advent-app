import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

export function Navigation() {
  return (
    <div className="absolute top-4 right-4">
      <Link
        to="/login"
        className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-lg"
        style={{ backgroundColor: '#002663' }}
      >
        <Settings className="w-4 h-4" />
        <span>Admin</span>
      </Link>
    </div>
  );
}