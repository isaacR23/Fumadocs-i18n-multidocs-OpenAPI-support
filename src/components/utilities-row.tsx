'use client';

import { FuseSearchModal } from './fuse-search';
import { LanguageSwitcher } from './language-switcher';
export function UtilitiesRow() {

  return (
    <div className="flex items-center gap-2">
      <FuseSearchModal />
      <LanguageSwitcher />
    </div>
  );
}
