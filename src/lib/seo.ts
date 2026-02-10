import { Metadata } from 'next';

interface MetadataParams {
  title: string;
  description: string;
  path: string;
  locale?: 'en' | 'ja';
  images?: string[];
  type?: 'website' | 'article';
  keywords?: string[];
}

const baseUrl = 'https://opensource3dassets.com';

const defaultKeywords = [
  'free 3D assets',
  'GLB models',
  'open source 3D assets',
  '3D props',
  '3D environments',
  'free 3D models',
  '3D asset download',
  'game assets',
  'Blender assets',
  'CC0 3D models',
  '無料3Dアセット',
  '3Dモデル',
  'オープンソース3Dアセット',
];

export function generateSEOMetadata({
  title,
  description,
  path,
  locale = 'en',
  images = [],
  type = 'website',
  keywords = [],
}: MetadataParams): Metadata {
  const fullTitle = title === 'Open Source 3D Assets' 
    ? 'Open Source 3D Assets - Free GLB Models for Games, VR & 3D Projects'
    : `${title} | Open Source 3D Assets`;

  const url = `${baseUrl}${path}`;
  const defaultImage = `${baseUrl}/og-image.png`;
  const imageUrls = images.length > 0 ? images : [defaultImage];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  // Alternate language URLs
  const alternateLocale = locale === 'en' ? 'ja' : 'en';
  const alternatePath = path.replace(`/${locale}`, `/${alternateLocale}`);

  return {
    metadataBase: new URL(baseUrl),
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: 'ToxSam', url: 'https://toxsam.com' }],
    creator: 'ToxSam',
    publisher: 'Open Source 3D Assets',
    
    // Open Graph
    openGraph: {
      type,
      locale: locale === 'en' ? 'en_US' : 'ja_JP',
      url,
      title: fullTitle,
      description,
      siteName: 'Open Source 3D Assets',
      images: imageUrls.map(img => ({
        url: img,
        width: 1200,
        height: 630,
        alt: title,
      })),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: '@toxsam',
      creator: '@toxsam',
      title: fullTitle,
      description,
      images: imageUrls,
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Alternate languages
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/en${path.replace(`/${locale}`, '')}`,
        'ja': `${baseUrl}/ja${path.replace(`/${locale}`, '')}`,
        'x-default': `${baseUrl}/en${path.replace(`/${locale}`, '')}`,
      },
    },

    // Additional
    category: 'Technology',
    classification: '3D Assets, GLB Models, Game Development',
  };
}

// Helper for avatar-specific metadata
export function generateAvatarMetadata(
  avatar: {
    id: string;
    name: string;
    description?: string;
    thumbnailUrl?: string;
    format: string;
    project: string;
    polygonCount?: number;
  },
  locale: 'en' | 'ja' = 'en'
): Metadata {
  const title = locale === 'en' 
    ? `${avatar.name} - Free ${avatar.format.toUpperCase()} Avatar`
    : `${avatar.name} - 無料${avatar.format.toUpperCase()}アバター`;

  const description = locale === 'en'
    ? avatar.description || 
      `Download ${avatar.name}, a free open-source ${avatar.format.toUpperCase()} avatar from the ${avatar.project} collection. Perfect for VR, gaming, VTubing, and metaverse applications. ${avatar.polygonCount ? `${avatar.polygonCount.toLocaleString()} polygons.` : ''} CC0 license - use freely in any project.`
    : avatar.description ||
      `${avatar.name}をダウンロード。${avatar.project}コレクションの無料オープンソース${avatar.format.toUpperCase()}アバターです。VR、ゲーム、VTuber、メタバース用に最適。${avatar.polygonCount ? `${avatar.polygonCount.toLocaleString()}ポリゴン。` : ''}CC0ライセンス - あらゆるプロジェクトで自由に使用できます。`;

  const keywords = locale === 'en' ? [
    avatar.name,
    `${avatar.format} avatar`,
    `${avatar.project} avatar`,
    'download VRM',
    'free avatar model',
    'VTuber model',
    'VRChat avatar',
    '3D character model',
  ] : [
    avatar.name,
    `${avatar.format}アバター`,
    `${avatar.project}アバター`,
    'VRMダウンロード',
    '無料アバターモデル',
    'VTuberモデル',
    'VRChatアバター',
    '3Dキャラクターモデル',
  ];

  return generateSEOMetadata({
    title,
    description,
    path: `/${locale}/assets/${avatar.id}`,
    locale,
    images: avatar.thumbnailUrl ? [avatar.thumbnailUrl] : [],
    type: 'article',
    keywords,
  });
}
