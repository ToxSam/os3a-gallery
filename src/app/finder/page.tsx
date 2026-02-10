import React, { Suspense } from "react";
import Finder from "@/components/finder/Finder";
import { LoadingScreen } from "@/components/ui/loading-screen";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asset Finder - Batch Download | Open Source Avatars',
  description: 'Browse and download multiple assets at once. File finder interface for batch downloading VRM, GLB, FBX, and other 3D asset formats.',
  openGraph: {
    title: 'Asset Finder - Batch Download | Open Source Avatars',
    description: 'Browse and download multiple assets at once. File finder interface for batch downloading VRM, GLB, FBX, and other 3D asset formats.',
    url: 'https://opensourceavatars.com/finder',
    type: 'website',
    images: [
      {
        url: '/api/og?type=finder&title=Asset Finder&description=Batch Download Multiple Assets',
        width: 1200,
        height: 630,
        alt: 'Open Source Avatars Finder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asset Finder - Batch Download',
    description: 'Browse and download multiple assets at once.',
    images: ['/api/og?type=finder&title=Asset Finder&description=Batch Download Multiple Assets'],
  },
};

const FinderPage = () => {
  return (
    <main className="h-screen bg-cream dark:bg-cream-dark overflow-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <Finder />
      </Suspense>
    </main>
  );
};

export default FinderPage;
