import { NextResponse } from 'next/server';
import { getAvatars, GithubAvatar } from '@/lib/github-storage';

// No need for a separate interface since we're importing GithubAvatar
export async function GET() {
  try {
    // Get all avatars
    const avatars = await getAvatars() as GithubAvatar[];
    
    // Find all the different key patterns in alternateModels
    const patterns: Record<string, any> = {};
    
    avatars.forEach(avatar => {
      if (!avatar.metadata?.alternateModels) return;
      
      const keys = Object.keys(avatar.metadata.alternateModels).sort();
      const pattern = keys.join(',');
      
      if (!patterns[pattern]) {
        patterns[pattern] = {
          count: 0,
          keys,
          examples: []
        };
      }
      
      patterns[pattern].count++;
      
      // Add an example if we don't have too many already
      if (patterns[pattern].examples.length < 5) {
        patterns[pattern].examples.push({
          id: avatar.id,
          name: avatar.name,
          urls: Object.entries(avatar.metadata.alternateModels).map(([key, value]) => ({
            key,
            isArweaveUrl: typeof value === 'string' && value.includes('arweave.net'),
            valuePreview: typeof value === 'string' ? 
                          (value.length > 40 ? value.substring(0, 40) + '...' : value) : 
                          typeof value
          }))
        });
      }
    });
    
    // Sort by count (most common first)
    const sortedPatterns = Object.entries(patterns)
      .sort((a, b) => b[1].count - a[1].count)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {} as Record<string, any>);
    
    // Return the analysis
    return NextResponse.json({
      totalAvatars: avatars.length,
      avatarsWithAlternateModels: avatars.filter(a => a.metadata?.alternateModels).length,
      patterns: sortedPatterns
    });
  } catch (error) {
    console.error('Error analyzing avatar formats:', error);
    return NextResponse.json({ 
      error: 'Failed to analyze avatar formats',
    }, { status: 500 });
  }
} 