import React, { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { compressImage } from '../lib/imageUtils';

interface ImageUploadProps {
  onImageSelect: (base64: string) => void;
  currentImage?: string;
}

export function ImageUpload({ onImageSelect, currentImage }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setIsLoading(true);
        const compressedImage = await compressImage(file);
        onImageSelect(compressedImage);
      } catch (error) {
        console.error('Error handling image:', error);
        alert('Error processing image. Please try a different image.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="relative">
      {currentImage ? (
        <div className="relative group">
          <img 
            src={currentImage} 
            alt="Window content" 
            className="w-full h-32 object-cover rounded"
          />
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
            onClick={() => !isLoading && fileInputRef.current?.click()}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            ) : (
              <Upload className="w-6 h-6 text-white" />
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={isLoading}
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-32 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center gap-2 hover:border-blue-500 transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          ) : (
            <>
              <Upload className="w-6 h-6 text-gray-400" />
              <span className="text-sm text-gray-500">Upload image</span>
            </>
          )}
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}