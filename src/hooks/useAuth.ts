import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { auth, AuthState } from '../lib/auth';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(auth.getAuthState());

  useEffect(() => {
    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const newState = {
        isAuthenticated: !!session,
        username: session?.user?.email || ''
      };
      setAuthState(newState);
      localStorage.setItem('auth_state', JSON.stringify(newState));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (username: string, password: string) => {
    const success = await auth.login(username, password);
    if (success) {
      setAuthState(auth.getAuthState());
    }
    return success;
  };

  const logout = async () => {
    await auth.logout();
    setAuthState(auth.getAuthState());
  };

  return {
    ...authState,
    login,
    logout
  };
}