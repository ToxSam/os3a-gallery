import { TurboFactory } from '@ardrive/turbo-sdk';

/**
 * This module handles interactions with Arweave where avatar files are stored.
 * It replaces the previous S3 bucket functionality.
 */

// Initialize the Turbo client for unauthenticated access
// (we only need to read public files, not upload)
const turbo = TurboFactory.unauthenticated();

// Arweave gateway URL
const ARWEAVE_GATEWAY = 'https://arweave.net';

/**
 * Get a URL for an Arweave transaction by transaction ID
 * @param txId The Arweave transaction ID
 * @returns The URL to access the file
 */
export function getArweaveUrl(txId: string): string {
  if (!txId) return '';
  return `${ARWEAVE_GATEWAY}/${txId}`;
}

/**
 * Maps old S3 URLs to Arweave URLs
 * Used for transitioning from S3 to Arweave
 * @param s3Url The original S3 URL
 * @param arweaveTxId The Arweave transaction ID for the file
 * @returns The Arweave URL
 */
export function mapS3UrlToArweave(s3Url: string, arweaveTxMap: Record<string, string>): string {
  // Extract filename or key from S3 URL
  const urlParts = s3Url.split('/');
  const key = urlParts[urlParts.length - 1];
  
  // Look up the Arweave transaction ID for this file
  const txId = arweaveTxMap[key];
  if (txId) {
    return getArweaveUrl(txId);
  }
  
  // If no mapping exists, return the original URL (fallback)
  return s3Url;
}

/**
 * Get metadata for an Arweave transaction
 * @param txId The Arweave transaction ID
 * @returns A promise resolving to the transaction metadata
 */
export async function getArweaveMetadata(txId: string): Promise<any> {
  try {
    const response = await fetch(`${ARWEAVE_GATEWAY}/tx/${txId}/metadata`);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Arweave metadata:', error);
    return null;
  }
}

export default {
  getArweaveUrl,
  mapS3UrlToArweave,
  getArweaveMetadata
}; 