"use client";

import React from 'react';
import { AvatarHeader } from "@/components/asset/AvatarHeader";
import { Footer } from "@/components/Footer";
import { useI18n } from '@/lib/i18n';
import { useEffect } from 'react';

export function AboutPageContent() {
  const { t } = useI18n();

  const renderTextWithLinks = (text: string) => {
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];
    let key = 0;

    let match;
    while ((match = markdownLinkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(
          <React.Fragment key={key++}>
            {renderPlainUrls(text.substring(lastIndex, match.index))}
          </React.Fragment>
        );
      }
      elements.push(
        <a
          key={key++}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {match[1]}
        </a>
      );
      lastIndex = markdownLinkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(
        <React.Fragment key={key++}>
          {renderPlainUrls(text.substring(lastIndex))}
        </React.Fragment>
      );
    }
    return elements.length > 0 ? elements : text;
  };

  const renderPlainUrls = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {part}
          </a>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  useEffect(() => {
    document.title = 'About - Open Source 3D Assets | Free GLB Models';
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) ||
        document.querySelector(`meta[name="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const description = 'Discover 991+ free CC0 3D assets in GLB format. Props, environments, and structures from Polygonal Mind and more. Use in Blender, Unity, Unreal, Three.js.';
    const ogImageUrl = '/api/og?type=default&title=About Open Source 3D Assets&description=Free CC0 GLB 3D Models';
    updateMetaTag('description', description);
    updateMetaTag('og:title', 'About - Open Source 3D Assets');
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', `https://opensource3dassets.com${ogImageUrl}`);
    updateMetaTag('og:url', typeof window !== 'undefined' ? window.location.href : '');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', 'About - Open Source 3D Assets');
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `https://opensource3dassets.com${ogImageUrl}`);
  }, []);

  const howItWorksSteps = t('about.howItWorks.steps', { returnObjects: true });
  const futureItems = t('about.future.items', { returnObjects: true });
  const submitRequirements = t('about.getInvolved.submitCollection.requirements.list', { returnObjects: true });

  return (
    <div className="min-h-screen bg-cream dark:bg-cream-dark flex flex-col transition-colors">
      <AvatarHeader
        title="Open Source 3D Assets"
        description="Free CC0 GLB models - props, environments, and structures"
        socialLink="https://x.com/toxsam"
      />

      <main className="flex-1 pb-20 md:pb-32" style={{ marginTop: 'var(--osa-avatar-header-height)' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="space-y-16">
            <div>
              <h1 className="text-headline mb-12 text-gray-900 dark:text-gray-100">{t('about.title')}</h1>

              <h2 className="text-title mb-6 text-gray-900 dark:text-gray-100">{t('about.whatWeDo.title')}</h2>
              <p className="text-body-lg text-gray-500 dark:text-gray-400 mb-6">
                {t('about.whatWeDo.description1')}
              </p>
              <p className="text-body-lg text-gray-500 dark:text-gray-400 mb-12">
                {t('about.whatWeDo.description2')}
              </p>

              <h2 className="text-title mb-6 text-gray-900 dark:text-gray-100">{t('about.howItWorks.title')}</h2>
              <p className="text-body-lg text-gray-500 dark:text-gray-400 mb-6 font-semibold">
                {t('about.howItWorks.subtitle')}
              </p>
              <ul className="space-y-3 text-gray-500 dark:text-gray-400 mb-6 text-body">
                {Array.isArray(howItWorksSteps) && howItWorksSteps.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-body-lg text-gray-500 dark:text-gray-400 mb-12">
                {t('about.howItWorks.description')}
              </p>

              <h2 className="text-title mb-6 text-gray-900 dark:text-gray-100">{t('about.status.title')}</h2>
              <div className="grid gap-4 sm:grid-cols-2 mb-12">
                <div className="flex items-center gap-3">
                  <span className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg text-caption shrink-0">{t('about.status.badges.beta.label')}</span>
                  <p className="text-body-lg text-gray-500 dark:text-gray-400">{t('about.status.badges.beta.description')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg text-caption shrink-0">{t('about.status.badges.avatars.label')}</span>
                  <p className="text-body-lg text-gray-500 dark:text-gray-400">{t('about.status.badges.avatars.description')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg text-caption shrink-0">{t('about.status.badges.format.label')}</span>
                  <p className="text-body-lg text-gray-500 dark:text-gray-400">{t('about.status.badges.format.description')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg text-caption shrink-0">{t('about.status.badges.license.label')}</span>
                  <p className="text-body-lg text-gray-500 dark:text-gray-400">{t('about.status.badges.license.description')}</p>
                </div>
              </div>

              <h2 className="text-title mb-6 text-gray-900 dark:text-gray-100">{t('about.collections.title')}</h2>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-300 dark:border-gray-700 mb-12">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">{t('about.collections.polygonalMind.title')}</h3>
                <p className="text-body-lg text-gray-500 dark:text-gray-400 mb-2">
                  {t('about.collections.polygonalMind.description')}
                </p>
                <p className="text-caption text-gray-500 dark:text-gray-400 font-medium">{t('about.collections.polygonalMind.stats')}</p>
              </div>

              <h2 className="text-title mb-6 text-gray-900 dark:text-gray-100">{t('about.license.title')}</h2>
              <p className="text-body-lg text-gray-500 dark:text-gray-400 mb-12">
                {t('about.license.description')}
              </p>

              <h2 className="text-title mb-6 text-gray-900 dark:text-gray-100">{t('about.technical.title')}</h2>
              <div className="space-y-6 mb-12">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{t('about.technical.format.title')}</h3>
                  <p className="text-body text-gray-500 dark:text-gray-400">{t('about.technical.format.description')}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{t('about.technical.storage.title')}</h3>
                  <p className="text-body text-gray-500 dark:text-gray-400">{t('about.technical.storage.description')}</p>
                </div>
              </div>

              <h2 className="text-title mb-6 text-gray-900 dark:text-gray-100">{t('about.future.title')}</h2>
              <ul className="space-y-3 text-gray-500 dark:text-gray-400 mb-12 text-body">
                {Array.isArray(futureItems) && futureItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full mt-2 shrink-0" />
                    <span>{renderTextWithLinks(String(item))}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-title mb-6 text-gray-900 dark:text-gray-100">{t('about.getInvolved.title')}</h2>
              <div className="space-y-6 mb-12">
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-300 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t('about.getInvolved.submitCollection.title')}</h3>
                  <p className="text-body text-gray-500 dark:text-gray-400 mb-4">
                    {t('about.getInvolved.submitCollection.description')}
                  </p>
                  <p className="text-body font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {t('about.getInvolved.submitCollection.requirements.title')}
                  </p>
                  <ul className="space-y-2 text-gray-500 dark:text-gray-400 mb-4 text-body">
                    {Array.isArray(submitRequirements) && submitRequirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-body text-gray-500 dark:text-gray-400">
                    {renderTextWithLinks(String(t('about.getInvolved.submitCollection.submitVia')))}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-300 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t('about.getInvolved.contributeCode.title')}</h3>
                  <p className="text-body text-gray-500 dark:text-gray-400">
                    {renderTextWithLinks(String(t('about.getInvolved.contributeCode.description')))}{' '}
                    {renderTextWithLinks(String(t('about.getInvolved.contributeCode.link')))}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-300 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t('about.getInvolved.giveFeedback.title')}</h3>
                  <p className="text-body text-gray-500 dark:text-gray-400">
                    {renderTextWithLinks(String(t('about.getInvolved.giveFeedback.description')))}{' '}
                    {renderTextWithLinks(String(t('about.getInvolved.giveFeedback.link')))}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-300 dark:border-gray-700">
                <h2 className="text-title mb-6 text-gray-900 dark:text-gray-100">{t('about.connect.title')}</h2>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={String(t('about.connect.websiteUrl'))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-2"
                    aria-label="ToxSam website"
                  >
                    <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-body">{t('about.connect.website')}</span>
                  </a>
                  <a
                    href={String(t('about.connect.twitterUrl'))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-2"
                    aria-label="X/Twitter"
                  >
                    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="text-body">{t('about.connect.twitter')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
