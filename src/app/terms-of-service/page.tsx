import { redirect } from 'next/navigation';

export default function TermsOfServiceRedirect() {
  redirect('/en/docs/legal/terms-of-service');
}