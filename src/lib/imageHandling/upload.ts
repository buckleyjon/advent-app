import { supabase } from '../supabase';
import { ImageUploadResult } from './types';
import { compressImage } from './compression';

export async function uploadImage(file: File): Promise<ImageUploadResult> {
  try {
    // Compress the image before upload
    const compressedFile = await compressImage(file);
    
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `calendar-images/${fileName}`;

    // Upload to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from('calendar-images')
      .upload(filePath, compressedFile);

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data } = supabase.storage
      .from('calendar-images')
      .getPublicUrl(filePath);

    return {
      url: data.publicUrl,
      path: filePath
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}