import { supabase } from '../supabase';

const BUCKET_NAME = 'calendar-images';

export const storageService = {
  async uploadFile(filePath: string, file: File) {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;
  },

  async checkImageExists(path: string): Promise<boolean> {
    if (!path) return false;
    
    const fileName = path.split('/').pop()?.split('?')[0] || '';
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list('', {
        search: fileName
      });

    if (error || !data) return false;
    return data.some(file => file.name === fileName);
  },

  getPublicUrl(path: string): string {
    if (!path) return '';
    
    const fileName = path.split('/').pop()?.split('?')[0] || '';
    
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return data.publicUrl;
  }
}