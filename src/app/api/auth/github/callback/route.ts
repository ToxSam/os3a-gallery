import { NextRequest, NextResponse } from 'next/server';
import { getUsers, saveUsers } from '@/lib/github-storage';
import { v4 as uuidv4 } from 'uuid';
import { GithubUser } from '@/types/github-storage';
import { cookies } from 'next/headers';

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/api/auth/github/callback';

// These export configurations tell Next.js that this is a dynamic route
// and should not be statically generated
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

/**
 * This route handles the OAuth callback from GitHub
 * After GitHub redirects back to our app with a code, we exchange it for an access token
 * Then we fetch the user info and create/update the user in our GitHub storage
 */
export async function GET(request: NextRequest) {
  try {
    // Extract the code from the URL
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.redirect(new URL('/login?error=no_code', request.url));
    }
    
    // Exchange the code for an access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: GITHUB_REDIRECT_URI
      })
    });
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok || tokenData.error) {
      console.error('Error getting token:', tokenData);
      return NextResponse.redirect(new URL('/login?error=token_error', request.url));
    }
    
    const accessToken = tokenData.access_token;
    
    // Use the access token to get the user's GitHub profile
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    const userData = await userResponse.json();
    
    if (!userResponse.ok) {
      console.error('Error getting user:', userData);
      return NextResponse.redirect(new URL('/login?error=user_error', request.url));
    }
    
    // Get user email
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: {
        'Authorization': `token ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    const emailData = await emailResponse.json();
    
    if (!emailResponse.ok) {
      console.error('Error getting emails:', emailData);
      return NextResponse.redirect(new URL('/login?error=email_error', request.url));
    }
    
    // Find the primary email
    const primaryEmail = emailData.find((email: any) => email.primary)?.email || emailData[0]?.email;
    
    if (!primaryEmail) {
      return NextResponse.redirect(new URL('/login?error=no_email', request.url));
    }
    
    // Check if the user already exists in our database
    const users = await getUsers();
    // Try to find the user by email or username
    let user = users.find((u: GithubUser) => u.email === primaryEmail || 
                            u.username?.toLowerCase() === userData.login?.toLowerCase());

    if (!user) {
      // Create a new user
      user = {
        id: uuidv4(),
        username: userData.login,
        email: primaryEmail,
        passwordHash: '', // Not used with OAuth
        role: 'user', // Default role
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Add the new user to our database
      users.push(user);
      await saveUsers(users);
    } else {
      // Update the user's last login time
      user.updatedAt = new Date().toISOString();
      
      // Update the user in the database
      const userIndex = users.findIndex((u: GithubUser) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = user;
        await saveUsers(users);
      }
    }
    
    // Set a cookie with the user's ID and other necessary info
    // Note: In a production app, you'd use a proper JWT or signed cookie
    cookies().set({
      name: 'session',
      value: JSON.stringify({
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 1 week
      path: '/'
    });
    
    // Redirect to the dashboard or home page
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/login?error=unknown', request.url));
  }
} 