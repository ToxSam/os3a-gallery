'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthProvider';

const AuthHandler = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleSession = async () => {
      console.log('Checking session...');

      try {
        // Fetch session from our new GitHub auth endpoint instead of Supabase
        const response = await fetch('/api/auth/session', {
          credentials: 'include',
        });

        if (!response.ok) {
          console.log('No session found. Redirecting to login...');
          router.push('/login');
          return;
        }

        const sessionData = await response.json();

        if (sessionData.user) {
          console.log('User session found:', sessionData.user);
          setUser({
            userId: sessionData.user.id,
            username: sessionData.user.username || sessionData.user.login,
            email: sessionData.user.email || '',
            role: sessionData.user.role || 'user'
          });
        } else {
          console.log('No user in session. Redirecting to login...');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        router.push('/login');
      }
    };

    handleSession();
  }, [router, setUser]);

  return null;
};

export default AuthHandler;