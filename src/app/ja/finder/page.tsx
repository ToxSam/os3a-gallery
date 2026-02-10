import React, { Suspense } from "react";
import Finder from "@/components/finder/Finder";
import { LoadingScreen } from "@/components/ui/loading-screen";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'アセットファインダー - 一括ダウンロード | Open Source Avatars',
  description: '複数の3Dアセットを一度に閲覧・ダウンロード。VRM、GLB、FBXなどの3Dアセットフォーマットを一括ダウンロードするファイルファインダーインターフェース。',
  openGraph: {
    title: 'アセットファインダー - 一括ダウンロード | Open Source Avatars',
    description: '複数の3Dアセットを一度に閲覧・ダウンロード。VRM、GLB、FBXなどの3Dアセットフォーマットを一括ダウンロードするファイルファインダーインターフェース。',
    url: 'https://opensourceavatars.com/ja/finder',
    type: 'website',
    images: [
      {
        url: '/api/og?type=finder&title=アセットファインダー&description=複数のアセットを一括ダウンロード',
        width: 1200,
        height: 630,
        alt: 'Open Source Avatars ファインダー',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'アセットファインダー - 一括ダウンロード',
    description: '複数の3Dアセットを一度に閲覧・ダウンロード。',
    images: ['/api/og?type=finder&title=アセットファインダー&description=複数のアセットを一括ダウンロード'],
  },
};

const FinderPage = () => {
  return (
    <main className="min-h-screen bg-cream dark:bg-cream-dark">
      <Suspense fallback={<LoadingScreen />}>
        <Finder />
      </Suspense>
    </main>
  );
};

export default FinderPage;
