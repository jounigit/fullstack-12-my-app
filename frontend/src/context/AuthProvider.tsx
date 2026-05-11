// AuthContext.tsx
import {
  useState,
  useEffect,
  type ReactNode,
  useCallback
} from 'react';
import type { User } from '../features/users/types';
import { type AuthContextType } from './authTypes';
import { AuthContext } from './AuthContext';
// import {}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');

        if (token) {
          // Validate token and fetch user data
          const response = await fetch('/api/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('auth_token');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function with API call
  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      console.log('LOGIN RESPONSE:: ', response)
      const { user: userData, token } = await response.json();

      localStorage.setItem('auth_token', token);
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function to clear session
  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
    }
  }, []);

  // Register function for new users
  const register = useCallback(async (
    email: string,
    password: string,
    name: string
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const { user: userData, token } = await response.json();

      localStorage.setItem('auth_token', token);
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

