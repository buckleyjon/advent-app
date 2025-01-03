import { ImageUploadResult } from './types';
import { compressImage } from './compression';
import { uploadImage } from '../cloudinary';

export const imageService = {
  async upload(file: File): Promise<ImageUploadResult> {
    try {
      const compressedFile = await compressImage(file);
      const url = await uploadImage(compressedFile);

      return {
        url,
        path: url
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  },

  getPublicUrl(path: string): string {
    if (!path) return '';
    return path.startsWith('http') ? path : `https://res.cloudinary.com/defwziusr/image/upload/${path}`;
  }
}