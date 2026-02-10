import { useState } from 'react';
import { AvatarFormData, UploadProgress } from '@/types/avatar';
import { uploadWithProgress } from '@/lib/utils/uploadUtils';

const initialFormState: AvatarFormData = {
  name: '',
  project: '',
  description: '',
  polygons: '',
  format: 'VRM',
  materials: '',
  isPublic: true,
  isDraft: true,
  modelFile: null,
  thumbnail: null
};

export function useAvatarUpload() {
  const [formData, setFormData] = useState<AvatarFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({ thumbnail: 0, model: 0 });

  const getFileContentType = (file: File, type: 'thumbnail' | 'model'): string => {
    if (type === 'thumbnail') {
      return file.type || 'image/jpeg';
    }
    
    // Handle model files
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension === 'vrm') {
      return 'application/octet-stream';
    }
    if (extension === 'glb') {
      return 'model/gltf-binary';
    }
    return file.type || 'application/octet-stream';
  };

  const handleUpload = async (file: File, type: 'thumbnail' | 'model'): Promise<string> => {
    try {
      setUploadProgress(prev => ({ ...prev, [type]: 0 }));

      const contentType = getFileContentType(file, type);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({
          fileName: file.name,
          fileType: contentType
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get upload URL');
      }

      const { url, publicUrl } = await response.json();

      await uploadWithProgress(url, file, (progress) => {
        setUploadProgress(prev => ({ ...prev, [type]: progress }));
      });

      return publicUrl;
    } catch (error) {
      console.error(`${type} upload error:`, error);
      throw error;
    }
  };

  const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
    try {
      setError(null);
      setIsSubmitting(true);
  
      const [thumbnailUrl, modelFileUrl] = await Promise.all([
        formData.thumbnail ? handleUpload(formData.thumbnail, 'thumbnail') : Promise.resolve(null),
        formData.modelFile ? handleUpload(formData.modelFile, 'model') : Promise.resolve(null)
      ]);
  
      const response = await fetch('/api/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({
          ...formData,
          materials: parseInt(formData.materials),
          thumbnailUrl,
          modelFileUrl
        })
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create avatar');
      }
  
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Submit error:', error);
      setError(error instanceof Error ? error.message : 'Failed to create avatar');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    formData,
    setFormData,
    isSubmitting,
    error,
    uploadProgress,
    handleSubmit
  };
}