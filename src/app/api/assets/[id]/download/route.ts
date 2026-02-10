///src/app/api/assets/[id]/download/route.ts
import { NextResponse } from 'next/server';
import { getArweaveTxId } from '@/lib/arweaveMapping';
import { getArweaveUrl } from '@/lib/arweave';
import { getAvatars, getDownloadCounts, saveDownloadCounts } from '@/lib/github-storage';

// Define interfaces to fix type issues
interface DownloadCounts {
  counts: Record<string, number>;
}

interface AvatarMetadata {
  alternateModels?: {
    voxel?: string;
    voxel_vrm?: string;
    fbx?: string;
    'voxel-fbx'?: string;
    voxel_fbx?: string;
    [key: string]: string | undefined;
  };
  [key: string]: any;
}

interface Avatar {
  id: string;
  name: string;
  modelFileUrl: string | null;
  metadata: AvatarMetadata;
  [key: string]: any;
}

// Helper function to get model filename for a specific format
function getModelFilenameForFormat(
  avatar: Avatar,
  format: string | null
): string | null {
  if (!format || !avatar.metadata?.alternateModels) {
    return null;
  }
  
  const alternateModels = avatar.metadata.alternateModels;
  
  // Find the appropriate key based on the format
  if (format === 'fbx') {
    return alternateModels['fbx'] || null;
  }
  
  if (format === 'voxel') {
    return alternateModels['voxel_vrm'] || null;
  }
  
  if (format === 'voxel-fbx' || format === 'voxel_fbx') {
    return alternateModels['voxel_fbx'] || alternateModels['voxel-fbx'] || null;
  }
  
  return null;
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get request body for format preference
    const { format } = await request.json().catch(() => ({}));
    
    // Get avatar details from GitHub storage
    const avatars = await getAvatars();
    const avatar = avatars.find((a: Avatar) => a.id === params.id);

    if (!avatar) {
      return NextResponse.json({ error: 'Avatar not found' }, { status: 404 });
    }

    if (!avatar.modelFileUrl) {
      return NextResponse.json({ error: 'No model file available' }, { status: 400 });
    }

    try {
      let modelFilename = '';
      let actualFormat = format || 'default';
      
      // Check if a specific format was requested and if alternate models exist
      if (format && avatar.metadata?.alternateModels) {
        // Get model filename using our helper function
        const formatFilename = getModelFilenameForFormat(avatar, format);
        
        console.log('Download format requested:', format);
        console.log('Available alternate models:', JSON.stringify(avatar.metadata.alternateModels, null, 2));
        console.log('Format filename found:', formatFilename);
        
        if (formatFilename) {
          modelFilename = formatFilename;
        } else {
          // Format not found in alternate models
          return NextResponse.json({ 
            error: 'Requested format not available', 
            format, 
            availableFormats: Object.keys(avatar.metadata.alternateModels) 
          }, { status: 400 });
        }
      } else {
        // Use the default model file URL
        modelFilename = avatar.modelFileUrl.split('/').pop() || '';
      }
      
      if (!modelFilename) {
        return NextResponse.json({ error: 'Could not determine model filename' }, { status: 400 });
      }
      
      // Check if we have a mapping for this avatar in Arweave
      const modelTxId = getArweaveTxId(modelFilename, 'model');
      
      // Get the appropriate URL (Arweave or fallback to original)
      const downloadUrl = modelTxId 
        ? getArweaveUrl(modelTxId) 
        : avatar.modelFileUrl;

      // Record the download count (privacy-friendly approach)
      try {
        const downloadCounts = await getDownloadCounts() as DownloadCounts;
        
        if (!downloadCounts.counts) {
          downloadCounts.counts = {};
        }
        
        // Increment the download count for this avatar
        downloadCounts.counts[avatar.id] = (downloadCounts.counts[avatar.id] || 0) + 1;
        
        // Save the updated download counts
        saveDownloadCounts(downloadCounts).catch((error: Error) => {
          console.error('Failed to update download count:', error);
          // Continue anyway, since this shouldn't block the download
        });
      } catch (error) {
        console.error('Failed to update download count:', error);
        // Continue anyway, since this shouldn't block the download
      }

      return NextResponse.json({ 
        downloadUrl, 
        storageType: modelTxId ? 'arweave' : 's3',
        format: actualFormat,
        avatarName: avatar.name || avatar.metadata?.number || 'avatar'
      });
    } catch (error) {
      console.error('Download error:', error);
      return NextResponse.json(
        { error: 'Failed to generate download URL' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to process download request' },
      { status: 500 }
    );
  }
}

