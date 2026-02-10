import { NextRequest, NextResponse } from 'next/server';

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/api/auth/github/callback';

// These export configurations tell Next.js that this is a dynamic route
// and should not be statically generated
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

/**
 * This route initiates the GitHub OAuth flow
 * It redirects the user to GitHub's authorization page
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const redirectTo = searchParams.get('redirect_to') || '/';
    
    // Build the GitHub authorization URL
    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', GITHUB_REDIRECT_URI);
    authUrl.searchParams.set('scope', 'user:email read:user');
    authUrl.searchParams.set('state', redirectTo); // We'll use state to remember where to redirect after login
    
    // Redirect to GitHub for authorization
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Auth initiation error:', error);
    return NextResponse.redirect(new URL('/login?error=initiation_failed', request.url));
  }
} 