import { supabase } from './supabase';
import { sanitizeImageUrl } from './imageHandling/utils';

export interface CalendarSettings {
  startDate: string;
  endDate: string;
  title: string;
}

export interface WindowContent {
  date: string;
  content: string;
  imageUrl?: string;
}

export const storage = {
  getSettings: async (): Promise<CalendarSettings | null> => {
    try {
      const { data, error } = await supabase
        .from('calendar_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      
      if (!data) return null;
      
      return {
        startDate: data.start_date,
        endDate: data.end_date,
        title: data.title || 'Advent Calendar'
      };
    } catch (error) {
      console.error('Error fetching settings:', error);
      return null;
    }
  },

  saveSettings: async (settings: CalendarSettings): Promise<void> => {
    try {
      await supabase
        .from('calendar_settings')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      const { error } = await supabase
        .from('calendar_settings')
        .insert({
          start_date: settings.startDate,
          end_date: settings.endDate,
          title: settings.title || 'Advent Calendar'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving settings:', error);
      throw new Error('Failed to save settings');
    }
  },

  getWindows: async (): Promise<WindowContent[]> => {
    try {
      const { data, error } = await supabase
        .from('calendar_windows')
        .select('*')
        .order('date');
      
      if (error) throw error;
      
      return (data || []).map(window => ({
        date: window.date,
        content: window.content || '',
        imageUrl: window.image_url
      }));
    } catch (error) {
      console.error('Error fetching windows:', error);
      return [];
    }
  },

  saveWindows: async (windows: WindowContent[]): Promise<void> => {
    try {
      const { error } = await supabase
        .from('calendar_windows')
        .upsert(
          windows.map(window => ({
            date: window.date,
            content: window.content || '',
            image_url: window.imageUrl ? sanitizeImageUrl(window.imageUrl) : null
          })),
          { onConflict: 'date' }
        );

      if (error) throw error;
    } catch (error) {
      console.error('Error saving windows:', error);
      throw new Error('Failed to save windows');
    }
  }
};