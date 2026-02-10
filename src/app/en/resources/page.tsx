import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AvatarHeader } from "@/components/asset/AvatarHeader";
import { Footer } from "@/components/Footer";
import { DocLayout } from "@/components/docs/DocLayout";
import { DocContent } from "@/components/docs/DocContent";
import { DocNavigation } from "@/components/docs/DocNavigation";
import { loadContent } from "@/lib/content";
import { getPreviousNext } from "@/lib/navigation";

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Documentation and resources for Open Source 3D Assets — GLB format, collections, and developer guides.',
};

export default async function ResourcesPage() {
  const locale = 'en';
  
  try {
    const { content, metadata } = await loadContent(locale, []);
    
    // Get previous/next navigation
    const { previous, next } = getPreviousNext('/resources');
    
    return (
      <div className="h-screen bg-cream dark:bg-cream-dark flex flex-col transition-colors overflow-hidden">
        <AvatarHeader 
          title="Open Source 3D Assets"
          description="A registry of CC0 and open source 3D assets (GLB)"
          socialLink="https://x.com/toxsam"
        />

        <DocLayout breadcrumbItems={[
          { label: 'Resources', href: '/en/resources' }
        ]}>
          <>
            <DocContent>
              <article className="prose prose-lg dark:prose-invert max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </article>
            </DocContent>
            
            {/* Previous/Next navigation */}
            <DocNavigation 
              previous={previous ? { title: previous.title, href: previous.href } : undefined}
              next={next ? { title: next.title, href: next.href } : undefined}
            />
            
            {/* Footer inside scrollable main content */}
            <Footer variant="compact" />
          </>
        </DocLayout>
      </div>
    );
  } catch (error) {
    console.error('Error loading content:', error);
    notFound();
  }
}
