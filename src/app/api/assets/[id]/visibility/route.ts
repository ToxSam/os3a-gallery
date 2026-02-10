// src/app/api/assets/[id]/visibility/route.ts
import { NextResponse } from 'next/server';
import { getAvatars, saveAvatars, GithubAvatar as Avatar } from '@/lib/github-storage';
import { NextRequest } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const avatarId = params.id;
    
    // Verify authentication using session cookie
    const sessionCookie = req.cookies.get('session');
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 });
    }

    let sessionData;
    try {
      sessionData = JSON.parse(sessionCookie.value);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid session format' }, { status: 401 });
    }

    if (!sessionData.userId || !['admin', 'creator'].includes(sessionData.role)) {
      return NextResponse.json({ error: 'Unauthorized - Insufficient permissions' }, { status: 403 });
    }
    
    // Get all avatars from GitHub storage
    const avatars = await getAvatars();
    
    // Find the specific avatar by ID
    const avatarIndex = avatars.findIndex((a: Avatar) => a.id === params.id);
    
    if (avatarIndex === -1) {
      return NextResponse.json(
        { error: 'Avatar not found' },
        { status: 404 }
      );
    }
    
    // Toggle the visibility
    avatars[avatarIndex].isPublic = !avatars[avatarIndex].isPublic;
    
    // Update the updatedAt timestamp
    avatars[avatarIndex].updatedAt = new Date().toISOString();
    
    // Save the updated avatars array back to GitHub
    await saveAvatars(avatars);
    
    return NextResponse.json(avatars[avatarIndex]);
  } catch (error) {
    console.error('Error toggling avatar visibility:', error);
    return NextResponse.json(
      { error: 'Failed to toggle visibility' },
      { status: 500 }
    );
  }
}