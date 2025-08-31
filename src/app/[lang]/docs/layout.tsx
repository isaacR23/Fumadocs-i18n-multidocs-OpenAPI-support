
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { ReactNode } from 'react';
import tabsConfig from '@/app/docs.json';


export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {

  const { lang } = await params;


  return (
    <DocsLayout 
      sidebar={{
        tabs: tabsConfig[lang as keyof typeof tabsConfig].map((tab: { title: string; description: string; url: string }) => ({
          title: tab.title,
          description: tab.description,
          url: tab.url
        })),
      }}
      tree={source.pageTree[lang]}
      {...baseOptions(lang)}
    >
      {children}
    </DocsLayout>
  )
}
