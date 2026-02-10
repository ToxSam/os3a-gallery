// src/types/avatar.ts
// Trigger redeployment


// Form and Upload related interfaces
export interface AssetFormData {
  name: string;
  project: string;
  description: string;
  polygons: string;
  format: string;  // Added this field
  materials: string;
  isPublic: boolean;
  isDraft: boolean;
  modelFile: File | null;
  thumbnail: File | null;
  metadata?: Record<string, any>;  // Optional metadata field
}

// Legacy alias for backward compatibility
export interface AvatarFormData extends AssetFormData {}

export interface UploadProgress {
  thumbnail: number;
  model: number;
}
// Gallery related interfaces
export interface Asset {
  id: string;
  name: string;
  project: string;
  projectId: string; // Added project ID for filtering
  description: string;
  createdAt: string;
  thumbnailUrl: string | null;
  modelFileUrl: string | null;
  polygonCount: number;
  format: string;
  materialCount: number;
  isPublic: boolean;
  isDraft: boolean;
  metadata: Record<string, any>;
}

// Legacy alias for backward compatibility
export interface Avatar extends Asset {}

export interface Project {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  license?: string; // License type (e.g., "CC0", "CC-BY")
  createdAt: string;
  updatedAt: string;
  assetCount?: number; // Will be computed from assets
  avatarCount?: number; // Legacy field for backward compatibility
}

export interface ApiResponse {
  assets?: Asset[]; // New field
  avatars?: Avatar[]; // Legacy field for backward compatibility
  projects?: Project[]; // Added projects to API response
  pagination?: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface ViewerConfig {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  expression: string;
}

// Component Props interfaces
export interface AssetCardProps {
  asset: Asset;
  isSelected: boolean;
  isActive: boolean;
  onSelect: (id: string) => void;
  onClick: (asset: Asset) => void;
}

// Legacy alias for backward compatibility
export interface AvatarCardProps extends AssetCardProps {
  avatar: Asset;
  onClick: (avatar: Asset) => void;
}

export interface AssetViewerProps {
  asset: Asset;
  config: ViewerConfig;
  onMetadataLoad?: (metadata: Record<string, any>) => void;
  onFormatSelect?: (format: string | null) => void;
  selectedFormat?: string | null;
  onDownload?: (id: string, format?: string | null) => void;
  metadata?: Record<string, any> | null;
  assets?: Asset[];
  onAssetSelect?: (asset: Asset) => void;
  projects?: Project[];
  selectedProjectId?: string;
  onProjectSelect?: (projectId: string) => void;
}

// Legacy alias for backward compatibility
export interface AvatarViewerProps extends Omit<AssetViewerProps, 'asset' | 'assets' | 'onAssetSelect'> {
  avatar: Asset;
  avatars?: Asset[];
  onAvatarSelect?: (avatar: Asset) => void;
}

export interface AssetHeaderProps {
  title: string;
  description: string;
  socialLink: string;
  showWarningButton?: boolean;
}

// Legacy alias for backward compatibility
export interface AvatarHeaderProps extends AssetHeaderProps {}