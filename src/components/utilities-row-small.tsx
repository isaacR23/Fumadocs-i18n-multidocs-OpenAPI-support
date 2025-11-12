'use client';

import { FuseSearchModalSmall } from './fuse-search-small';
import { LanguageSwitcherSmall } from './language-switcher-small';
export function UtilitiesRowSmall() {

  return (
    <div className="flex items-center gap-2">
      <FuseSearchModalSmall />
      <LanguageSwitcherSmall />
    </div>
  );
}
