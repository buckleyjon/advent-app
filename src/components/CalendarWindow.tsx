import React, { useState, useEffect } from 'react';
import { isBefore, isToday, format } from 'date-fns';
import { Gift, Maximize2 } from 'lucide-react';
import { Modal } from './Modal';

interface CalendarWindowProps {
  date: Date;
  content: string;
  imageUrl?: string;
  isOpen: boolean;
  onOpen: () => void;
}

export function CalendarWindow({ date, content, imageUrl, isOpen, onOpen }: CalendarWindowProps) {
  const [showModal, setShowModal] = useState(false);
  const today = new Date();
  const isAvailable = isBefore(date, today) || isToday(date);

  const handleClick = () => {
    if (isAvailable && !isOpen) {
      onOpen();
    }
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <div
        className={`aspect-square rounded-lg shadow-lg transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm
          ${isAvailable ? 'hover:scale-105 hover:shadow-xl' : 'opacity-50 cursor-not-allowed'}
          ${isOpen ? 'bg-white/95' : 'bg-white/20 border border-white/30'}`}
        onClick={handleClick}
      >
        {isOpen ? (
          <div className="relative h-full">
            {imageUrl ? (
              <>
                <img 
                  src={imageUrl} 
                  alt={content}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handleExpandClick}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                {content && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-white bg-opacity-90">
                    <p className="text-sm text-center">{content}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center p-4">
                <p className="text-sm text-center">{content}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-4">
            <Gift className="w-8 h-8 mb-2 text-white" />
            <p className="font-bold text-white">{date.getDate()}</p>
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            {format(date, 'MMMM d, yyyy')}
          </h3>
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={content}
              className="w-full rounded-lg"
            />
          )}
          {content && (
            <p className="text-gray-700 mt-4">{content}</p>
          )}
        </div>
      </Modal>
    </>
  );
}