import { MetadataRoute } from 'next';

// Fetch avatars from GitHub
async function getAvatars() {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/ToxSam/open-source-3D-assets/main/data/projects.json',
      { 
        cache: 'no-store',
        next: { revalidate: 3600 } // Revalidate every hour
      }
    );
    
    if (!response.ok) {
      console.error('Failed to fetch avatars for sitemap');
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching avatars for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://opensource3dassets.com';
  const currentDate = new Date();
  const locales = ['en', 'ja'];

  // Static pages for both locales
  const staticPages = ['', '/gallery', '/finder', '/about', '/resources', '/glbinspector', '/test'];

  const allRoutes: MetadataRoute.Sitemap = [];

  // Add static routes
  locales.forEach(locale => {
    staticPages.forEach(page => {
      allRoutes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: currentDate,
        changeFrequency: page === '/gallery' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : page === '/gallery' ? 0.9 : 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            ja: `${baseUrl}/ja${page}`,
          }
        }
      });
    });
  });

  // Add root redirect
  allRoutes.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // Add asset routes
  const avatars = await getAvatars();
  avatars.forEach((avatar: any) => {
    // Only include public assets
    if (avatar.is_public) {
      locales.forEach(locale => {
        allRoutes.push({
          url: `${baseUrl}/${locale}/assets/${avatar.id}`,
          lastModified: new Date(avatar.updated_at || avatar.created_at || currentDate),
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: {
            languages: {
              en: `${baseUrl}/en/assets/${avatar.id}`,
              ja: `${baseUrl}/ja/assets/${avatar.id}`,
            }
          }
        });
      });
    }
  });

  return allRoutes;
}
