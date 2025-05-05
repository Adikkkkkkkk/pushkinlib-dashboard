'use client';
import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import DropdownMenu from '@/components/DropdownMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'ru';
  const currentPathname = pathname?.split('/')[2] || 'home';
  const t = useTranslations('Header');

  return (
    <header className="my-10 flex items-center justify-between gap-5">
      <Link className="flex items-center gap-4" href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <p className="text-2xl font-semibold ">Pushkin Library Board</p>
      </Link>

      <ul className="flex flex-row items-center justify-center gap-8 font-normal">
        <li
          className={`cursor-pointer ${currentPathname === 'home' ? 'font-medium text-primary hover:text-primary/90' : ' text-dark-100 hover:text-gray-500'}`}
        >
          <Link href="/">
            <p>{t('home')}</p>
          </Link>
        </li>
        <li
          className={`cursor-pointer ${currentPathname === 'search' ? 'font-medium text-primary hover:text-primary/90' : ' text-dark-100 hover:text-gray-500'}`}
        >
          <Link href="/search">
            <p>{t('search')}</p>
          </Link>
        </li>
        <li>
          <DropdownMenu
            currentLocale={currentLocale}
            userName={session?.user?.name || ''}
          />
        </li>

        <li>
          <LanguageSwitcher />
        </li>
      </ul>
    </header>
  );
};

export default Header;
