import { i18n } from '@/lib/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { UtilitiesRowSmall } from '@/components/utilities-row-small';
import { UtilitiesRow } from '@/components/utilities-row';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: (
        <>
          <Image
            src="/LandingAnalyticsSquare.png"
            alt="Landing Analytics Logo"
            width={20}
            height={20}
            className="rounded"
          />
          <span className="ml-1 text-lg">Landing Analytics</span>
        </>
      )
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
    searchToggle: {
      components: {
        sm: <UtilitiesRowSmall />,
        lg: <UtilitiesRow />
      }
    },
    
  };
}
