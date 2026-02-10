import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GLB Inspector',
  description: 'Inspect and analyze GLB 3D files — view metadata, materials, textures, and preview models. Open Source 3D Assets.',
};

export default function VRMInspectorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-cream">
      {children}
    </div>
  );
} 