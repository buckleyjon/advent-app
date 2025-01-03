import { supabase } from './supabase';

export interface AuthState {
  isAuthenticated: boolean;
  username: string;
}

const ADMIN_CREDENTIALS = {
  username: 'admin@example.com',
  password: 'admin123'
};

export const auth = {
  login: async (username: string, password: string): Promise<boolean> => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const { error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) {
        console.error('Supabase auth error:', error);
        return false;
      }

      localStorage.setItem('auth_state', JSON.stringify({ isAuthenticated: true, username }));
      return true;
    }
    return false;
  },

  logout: async (): Promise<void> => {
    await supabase.auth.signOut();
    localStorage.removeItem('auth_state');
  },

  getAuthState: (): AuthState => {
    const data = localStorage.getItem('auth_state');
    return data ? JSON.parse(data) : { isAuthenticated: false, username: '' };
  }
};