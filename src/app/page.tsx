import { redirect } from 'next/navigation';
import { i18n } from '@/lib/i18n';

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  return i18n.languages.map((lang) => ({
    lang,
  }));
}

export default function RootPage() {
  // Redirect root path to default locale docs
  redirect('/en/docs');
}
