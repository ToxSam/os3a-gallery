import { NextResponse } from 'next/server';
import { getArweaveTxId } from '@/lib/arweaveMapping';
import { getArweaveUrl } from '@/lib/arweave';

export async function POST(request: Request) {
  try {
    const { filename } = await request.json();
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }
    
    // Log the requested filename for debugging
    console.log('Resolving voxel URL for filename:', filename);
    
    // If the input is already an Arweave URL, return it directly
    if (filename.includes('arweave.net')) {
      console.log('Input is already an Arweave URL, returning it directly');
      return NextResponse.json({ url: filename });
    }
    
    // Try different variations of the filename
    const variations = [
      filename,                        // Original
      filename.includes('.') ? filename : `${filename}.vrm`, // Add .vrm if no extension
      filename.includes('/') ? filename.split('/').pop() || filename : filename, // Just filename
      filename.replace(/_/g, '-'),    // Replace underscores with hyphens
      filename.replace(/-/g, '_')     // Replace hyphens with underscores
    ];
    
    console.log('Trying filename variations:', variations);
    
    // Try each variation
    for (const variant of variations) {
      if (!variant) continue;
      
      console.log('Checking variant:', variant);
      const txId = getArweaveTxId(variant, 'model');
      
      if (txId) {
        const url = getArweaveUrl(txId);
        console.log('Found URL with variant:', variant, 'URL:', url);
        return NextResponse.json({ url });
      }
    }
      
    // If none of the variations work, return an error
    console.log('No Arweave txId found for any filename variation');
    return NextResponse.json({ 
      error: 'No Arweave transaction ID found for the provided filename',
      url: null,
      triedVariations: variations
    }, { status: 404 });
  } catch (error) {
    console.error('Error resolving voxel URL:', error);
    return NextResponse.json({ 
      error: 'Failed to resolve voxel URL',
      url: null 
    }, { status: 500 });
  }
} 