import React from "react";
import AvatarGallery from "@/components/asset/AvatarGallery";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '300+ Free GLB Assets Gallery | Open Source Avatars',
  description: 'Browse and download 300+ free, high-quality 3D GLB assets for VR, gaming, VTubing, and metaverse. All CC0 licensed - use them in any project, no attribution required.',
  openGraph: {
    title: '300+ Free GLB Assets Gallery | Open Source Avatars',
    description: 'Browse and download 300+ free, high-quality 3D GLB assets for VR, gaming, VTubing, and metaverse. All CC0 licensed.',
    url: 'https://opensourceavatars.com/en/gallery',
    type: 'website',
    images: [
      {
        url: '/api/og?type=gallery&title=Asset Gallery&description=300+ Free GLB Assets for VR, Gaming & Metaverse',
        width: 1200,
        height: 630,
        alt: 'Open Source Assets Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '300+ Free GLB Assets Gallery',
    description: 'Browse and download 300+ free, high-quality 3D GLB assets. All CC0 licensed.',
    images: ['/api/og?type=gallery&title=Asset Gallery&description=300+ Free GLB Assets for VR, Gaming & Metaverse'],
  },
};

const GalleryPage = () => {
  return (
    <main className="min-h-screen bg-cream">
      <AvatarGallery />
    </main>
  );
};

export default GalleryPage; 