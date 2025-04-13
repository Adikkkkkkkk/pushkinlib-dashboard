import { sampleBooks } from '@/app/constants';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import { signOut } from '@/auth';
import React from 'react';

import Link from 'next/link';
import { cn } from '../lib/utils';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40}></Image>
      </Link>

      <ul className="flex flex-row items-center gap-8 font-normal">
        <li>
          <form
            action={async () => {
              'use server';

              await signOut();
            }}
            className="mb-10"
          >
            <Button>Выйти c аккаунта</Button>
          </form>

          {/* <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session?.user?.name || 'IN')}
              </AvatarFallback>
            </Avatar>
          </Link> */}
        </li>
      </ul>
    </header>
  );
};

export default Header;
