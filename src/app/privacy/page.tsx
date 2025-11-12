import { redirect } from 'next/navigation';

export default function PrivacyRedirect() {
  redirect('/en/docs/legal/privacy-policy');
}