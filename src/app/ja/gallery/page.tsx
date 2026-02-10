import React from "react";
import AvatarGallery from "@/components/asset/AvatarGallery";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '300種類以上の無料GLBアセットギャラリー | Open Source Avatars',
  description: 'VR、ゲーム、VTuber、メタバース向けの300種類以上の無料・高品質3D GLBアセットを閲覧・ダウンロード。すべてCC0ライセンス - クレジット表記不要で自由に使用可能。',
  openGraph: {
    title: '300種類以上の無料GLBアセットギャラリー | Open Source Avatars',
    description: 'VR、ゲーム、VTuber、メタバース向けの300種類以上の無料・高品質3D GLBアセットを閲覧・ダウンロード。すべてCC0ライセンス。',
    url: 'https://opensourceavatars.com/ja/gallery',
    type: 'website',
    images: [
      {
        url: '/api/og?type=gallery&title=アセットギャラリー&description=VR、ゲーム、メタバース向けの300種類以上の無料GLBアセット',
        width: 1200,
        height: 630,
        alt: 'Open Source Assets ギャラリー',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '300種類以上の無料GLBアセットギャラリー',
    description: '300種類以上の無料・高品質3D GLBアセットを閲覧・ダウンロード。すべてCC0ライセンス。',
    images: ['/api/og?type=gallery&title=アセットギャラリー&description=VR、ゲーム、メタバース向けの300種類以上の無料GLBアセット'],
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