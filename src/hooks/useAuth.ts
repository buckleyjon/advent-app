import { useState, useEffect } from 'react';
import { auth, AuthState } from '../lib/auth';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(auth.getAuthState());

  const login = (username: string, password: string) => {
    const success = auth.login(username, password);
    if (success) {
      setAuthState(auth.getAuthState());
    }
    return success;
  };

  const logout = () => {
    auth.logout();
    setAuthState(auth.getAuthState());
  };

  return {
    ...authState,
    login,
    logout
  };
}