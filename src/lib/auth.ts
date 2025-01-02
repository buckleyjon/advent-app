import { storage } from './storage';

const AUTH_KEY = 'auth_state';

export interface AuthState {
  isAuthenticated: boolean;
  username: string;
}

export const auth = {
  login: (username: string, password: string): boolean => {
    if (storage.verifyCredentials(username, password)) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ isAuthenticated: true, username }));
      return true;
    }
    return false;
  },

  logout: (): void => {
    localStorage.removeItem(AUTH_KEY);
  },

  getAuthState: (): AuthState => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : { isAuthenticated: false, username: '' };
  }
};