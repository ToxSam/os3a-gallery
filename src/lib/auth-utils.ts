import { cookies } from 'next/headers';

/**
 * User session information from the cookie
 */
export interface UserSession {
  userId: string;
  username: string;
  email: string;
  role: string;
}

/**
 * Get the current user's session from the cookie
 * @returns The user session or null if not logged in
 */
export function getUserSession(): UserSession | null {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session');
  
  if (!sessionCookie) {
    return null;
  }
  
  try {
    const session = JSON.parse(sessionCookie.value);
    return session as UserSession;
  } catch (error) {
    console.error('Failed to parse session cookie:', error);
    return null;
  }
}

/**
 * Check if the current user is authenticated
 * @returns True if the user is logged in, false otherwise
 */
export function isAuthenticated(): boolean {
  return getUserSession() !== null;
}

/**
 * Check if the current user has a specific role
 * @param role The role to check for
 * @returns True if the user has the role, false otherwise
 */
export function hasRole(role: string): boolean {
  const session = getUserSession();
  return session !== null && session.role === role;
}

/**
 * Check if the current user is an admin
 * @returns True if the user is an admin, false otherwise
 */
export function isAdmin(): boolean {
  return hasRole('admin');
}

/**
 * Get the current user's ID
 * @returns The user ID or null if not logged in
 */
export function getUserId(): string | null {
  const session = getUserSession();
  return session ? session.userId : null;
}

/**
 * Logout the current user
 * Server action to log out by removing the session cookie
 */
export async function logout() {
  'use server';
  cookies().delete('session');
}

export default {
  getUserSession,
  isAuthenticated,
  hasRole,
  isAdmin,
  getUserId,
  logout
}; 