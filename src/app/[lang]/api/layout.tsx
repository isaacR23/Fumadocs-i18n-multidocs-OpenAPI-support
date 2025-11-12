
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { apiSource } from '@/lib/source';
import { createElement, ReactNode } from 'react';
import tabsConfig from '@/app/docs.json';
import pageTreeDocs from '@/app/pageTree.api.json';
import type { PageTree } from 'fumadocs-core/server';
import { icons } from 'lucide-react';
import { i18n } from '@/lib/i18n';

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  return i18n.languages.map((lang) => ({
    lang,
  }));
}

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {

  const { lang } = await params;

  const switcher = tabsConfig[lang as keyof typeof tabsConfig].map((tab: { title: string; description: string; url: string, icon: string }) => ({
    title: tab.title,
    description: tab.description,
    url: tab.url,
    icon: tab.icon && icons[tab.icon as keyof typeof icons] 
      ? createElement(icons[tab.icon as keyof typeof icons], {
        className: "size-10 shrink-0 md:size-5 text-gray-400 bg-gray-100 rounded-md p-1", // Custom size and color
        })
      : undefined,
  }));

  const tree : PageTree.Root = {
    name: pageTreeDocs[lang as keyof typeof pageTreeDocs].title,
    children: (pageTreeDocs[lang as keyof typeof pageTreeDocs].children as PageTree.Node[]) || []
  };

  return (
    <DocsLayout 
    sidebar={{ tabs: switcher }}
    tree={tree}
    // tree={apiSource.pageTree[lang]}
    {...baseOptions(lang)}
  >
    {children}
  </DocsLayout>
  )
}
