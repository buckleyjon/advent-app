import imageCompression from 'browser-image-compression';
import { ImageCompressionOptions } from './types';

const defaultOptions: ImageCompressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true
};

export async function compressImage(
  file: File, 
  options: Partial<ImageCompressionOptions> = {}
): Promise<File> {
  const compressionOptions = { ...defaultOptions, ...options };
  
  try {
    return await imageCompression(file, compressionOptions);
  } catch (error) {
    console.error('Error compressing image:', error);
    throw new Error('Failed to compress image');
  }
}