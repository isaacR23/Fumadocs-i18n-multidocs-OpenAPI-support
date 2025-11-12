import { RootProvider } from 'fumadocs-ui/provider';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { i18n } from '@/lib/i18n';
import { Inter } from 'next/font/google';
import '../global.css';

const inter = Inter({
  subsets: ['latin'],
});


const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: 'English',
    },
    es: {
      displayName: 'Spanish',
      search: 'Buscar documentos',
    },
  },
});

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  return i18n.languages.map((lang) => ({
    lang,
  }));
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const lang = (await params).lang;

  return (
     <html lang={lang} className={inter.className} suppressHydrationWarning>

      <body>
        <RootProvider
          i18n={provider(lang)}
          search={{enabled: false}}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}