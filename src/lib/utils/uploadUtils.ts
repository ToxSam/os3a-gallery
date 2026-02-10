/**
 * Upload a file to a presigned URL with progress reporting.
 * @param url - Presigned upload URL (e.g. from /api/upload)
 * @param file - File to upload
 * @param onProgress - Callback with progress 0-100
 */
export function uploadWithProgress(
  url: string,
  file: File,
  onProgress: (progress: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload aborted'));
    });

    xhr.open('PUT', url);

    const contentType = file.type || 'application/octet-stream';
    xhr.setRequestHeader('Content-Type', contentType);

    xhr.send(file);
  });
}
