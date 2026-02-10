import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';
import { WebsiteSchema, OrganizationSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  metadataBase: new URL('https://opensource3dassets.com'),
  title: {
    default: 'Open Source 3D Assets - Free GLB Models for Games, VR & 3D Projects',
    template: '%s | Open Source 3D Assets',
  },
  description: 'Download 991+ free, high-quality GLB 3D assets for games, VR, and 3D projects. CC0 licensed open-source 3D models and environments. No attribution required.',
  keywords: [
    'free 3D assets',
    'GLB models download',
    'open source 3D assets',
    '3D props',
    '3D environments',
    'free 3D models',
    'game assets',
    'Blender assets',
    'CC0 3D models',
    'GLB inspector',
    '無料3Dアセット',
    '3Dモデル',
    'オープンソース3Dアセット',
  ],
  authors: [{ name: 'ToxSam', url: 'https://toxsam.com' }],
  creator: 'ToxSam',
  publisher: 'Open Source 3D Assets',
  applicationName: 'Open Source 3D Assets',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://opensource3dassets.com',
    title: 'Open Source 3D Assets - Free GLB Models',
    description: 'Download 991+ free, high-quality GLB 3D assets for games, VR, and 3D projects. CC0 licensed.',
    siteName: 'Open Source 3D Assets',
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@toxsam',
    creator: '@toxsam',
    title: 'Open Source 3D Assets - Free GLB Models',
    description: 'Download 991+ free, high-quality GLB 3D assets for games, VR, and 3D projects. CC0 licensed.',
  },
  
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
  
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png?v=2', sizes: '192x192', type: 'image/png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png?v=2', sizes: '512x512', type: 'image/png' },
    ],
  },
  
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="t4Qn-su363dOXOqODpU2eZWgSmBhbU1QgatUeWuiHgA" />
        
        {/* Theme initialization script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const shouldBeDark = theme === 'dark' || (!theme && systemPrefersDark);
                if (shouldBeDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={GeistSans.className}>
        <WebsiteSchema />
        <OrganizationSchema />
        <I18nProvider defaultLocale="en">
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}