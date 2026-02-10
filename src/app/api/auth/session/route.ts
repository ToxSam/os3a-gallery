import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// These export configurations tell Next.js that this is a dynamic route
// and should not be statically generated
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    // Get the session cookie
    const sessionCookie = cookies().get('session');

    if (!sessionCookie) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    try {
      // Parse the session cookie
      const sessionData = JSON.parse(sessionCookie.value);
      
      // Return the user object from session
      return NextResponse.json({
        user: {
          userId: sessionData.userId,
          username: sessionData.username,
          email: sessionData.email,
          role: sessionData.role
        }
      }, { status: 200 });
    } catch (error) {
      console.error('Error parsing session:', error);
      return NextResponse.json({ user: null }, { status: 200 });
    }
  } catch (error) {
    console.error('Session API error:', error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
} 