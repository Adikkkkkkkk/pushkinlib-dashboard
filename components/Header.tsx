'use client';
import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import DropdownMenu from '@/components/DropdownMenu';

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'ru';

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-start justify-center gap-8 font-normal">
        <li className="order-2">
          <DropdownMenu
            currentLocale={currentLocale}
            userName={session?.user?.name || ''}
          />
        </li>
      </ul>
    </header>
  );
};

export default Header;
