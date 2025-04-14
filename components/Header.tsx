import { Button } from '@/components/ui/button';
import { signOut } from '@/auth';
import React from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { getInitials } from '../lib/utils';
import Image from 'next/image';
// import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';

const Header = ({ session }: { session: Session }) => {
  // const pathname = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40}></Image>
      </Link>

      <ul className="flex flex-row items-start justify-center gap-8 font-normal">
        <li className="order-2">
          <form
            action={async () => {
              'use server';

              await signOut();
            }}
            className="mb-10"
          >
            <Button>Выйти c аккаунта</Button>
          </form>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session?.user?.name || 'IN')}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
