'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TestPage() {
  const [status, setStatus] = useState('');
  const [userData, setUserData] = useState<any>(null);

  const checkSession = async () => {
    try {
      // Check GitHub session
      const response = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Session data:', data);

      if (data.user) {
        setUserData(data.user);
        setStatus(`Logged in as: ${data.user.username} (${data.user.role})`);
      } else {
        setUserData(null);
        setStatus('No active session');
      }
    } catch (e: unknown) {
      // Type guard for error
      if (e instanceof Error) {
        console.error('Session check error:', e);
        setStatus('Error checking session: ' + e.message);
      } else {
        console.error('Unknown error:', e);
        setStatus('Error checking session');
      }
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleGitHubSignIn = () => {
    window.location.href = '/api/auth/github/login';
  };

  const handleSignOut = async () => {
    try {
      setStatus('Signing out...');
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to sign out');
      }

      setUserData(null);
      setStatus('Signed out successfully');
    } catch (e: unknown) {
      // Type guard for error
      if (e instanceof Error) {
        console.error('Sign out error:', e);
        setStatus(e.message || 'Sign out failed');
      } else {
        console.error('Unknown error:', e);
        setStatus('Sign out failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-bold text-center">Auth Test Page</h2>

          <div className="space-y-2">
            {!userData ? (
              <Button 
                onClick={handleGitHubSignIn}
                className="w-full"
              >
                Sign In with GitHub
              </Button>
            ) : (
              <Button 
                onClick={handleSignOut}
                variant="outline"
                className="w-full"
              >
                Sign Out
              </Button>
            )}

            <Button 
              onClick={checkSession}
              variant="outline"
              className="w-full"
            >
              Check Session
            </Button>
          </div>

          {status && (
            <div className="p-4 bg-gray-100 rounded-md text-sm">
              {status}
            </div>
          )}

          {userData && (
            <div className="p-4 bg-gray-100 rounded-md text-sm">
              <h3 className="font-semibold">User Data:</h3>
              <pre className="whitespace-pre-wrap overflow-x-auto text-xs mt-2">
                {JSON.stringify(userData, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
