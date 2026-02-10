import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import { Noto_Sans_JP } from 'next/font/google';
import { AuthProvider } from '@/lib/auth/AuthProvider';
import { I18nProvider } from '@/lib/i18n';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'Open Source 3D Assets - Free GLB Models for Games, VR & 3D Projects',
  description: 'Download 991+ free, high-quality GLB 3D assets for games, VR, and 3D projects. CC0 licensed open-source 3D models and environments. No attribution required.',
  openGraph: {
    title: 'Open Source 3D Assets - Free GLB Models',
    description: 'Download 991+ free, high-quality GLB 3D assets for games, VR, and 3D projects. CC0 licensed.',
    url: 'https://opensource3dassets.com/en',
    type: 'website',
    images: [
      {
        url: 'https://opensource3dassets.com/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Open Source 3D Assets - Free GLB Models',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Source 3D Assets - Free GLB Models',
    description: 'Download 991+ free, high-quality GLB 3D assets. CC0 licensed.',
    images: ['https://opensource3dassets.com/opengraph-image.png'],
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

const fontClasses = `${inter.variable} ${GeistMono.variable} ${notoSansJP.variable}`;

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontClasses} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <I18nProvider defaultLocale="en">
          <AuthProvider>{children}</AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}