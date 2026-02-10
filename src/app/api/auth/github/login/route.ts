import { NextResponse } from 'next/server';

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/api/auth/github/callback';

export async function GET() {
  try {
    // Create GitHub OAuth URL
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.append('client_id', GITHUB_CLIENT_ID);
    githubAuthUrl.searchParams.append('redirect_uri', GITHUB_REDIRECT_URI);
    githubAuthUrl.searchParams.append('scope', 'user:email');
    
    // Redirect to GitHub login page
    return NextResponse.redirect(githubAuthUrl.toString());
  } catch (error) {
    console.error('GitHub login error:', error);
    return NextResponse.redirect(new URL('/login?error=auth_error', GITHUB_REDIRECT_URI));
  }
} 