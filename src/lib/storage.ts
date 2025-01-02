// Simple storage utility for calendar data
export interface CalendarSettings {
  startDate: string;
  endDate: string;
}

export interface WindowContent {
  date: string;
  content: string;
  imageUrl?: string;
}

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

const SETTINGS_KEY = 'calendar_settings';
const WINDOWS_KEY = 'calendar_windows';

export const storage = {
  getSettings: (): CalendarSettings | null => {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : null;
  },

  saveSettings: (settings: CalendarSettings): void => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  getWindows: (): WindowContent[] => {
    const data = localStorage.getItem(WINDOWS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveWindows: (windows: WindowContent[]): void => {
    localStorage.setItem(WINDOWS_KEY, JSON.stringify(windows));
  },

  verifyCredentials: (username: string, password: string): boolean => {
    return username === ADMIN_CREDENTIALS.username && 
           password === ADMIN_CREDENTIALS.password;
  }
};