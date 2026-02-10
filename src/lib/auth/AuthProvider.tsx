'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type UserType = {
  userId: string;
  username: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: UserType | null;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => Promise<void>;
  setUser: (user: UserType | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for session cookie on component mount
    const checkSession = async () => {
      try {
        setIsLoading(true);
        // Check if we have a session cookie
        const response = await fetch('/api/auth/session', {
          method: 'GET',
          credentials: 'include', // Important to include credentials for cookies
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = () => {
    // Redirect to GitHub login
    window.location.href = '/api/auth/github/login';
  };

  const signOut = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        // Redirect to home page after logout
        window.location.href = '/';
      } else {
        throw new Error('Failed to log out');
      }
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    signIn,
    signOut,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}