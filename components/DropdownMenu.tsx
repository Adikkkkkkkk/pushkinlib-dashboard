'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { logout } from '@/lib/actions/logout';
import { getInitials } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const DropdownMenu = ({
  currentLocale,
  userName,
}: {
  currentLocale: string;
  userName?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const res = await fetch('/api/is-admin');
        if (res.ok) {
          const data = await res.json();
          setIsAdmin(data.isAdmin);
        }
      } catch (error) {
        console.error('Ошибка получения isAdmin:', error);
      }
    };

    fetchAdminStatus();
  }, []);

  return (
    <div className="relative">
      <Avatar
        className="cursor-pointer transition-all duration-200 ease-in-out hover:border-4 hover:bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AvatarFallback className="bg-amber-100">
          {getInitials(userName || 'IN')}
        </AvatarFallback>
      </Avatar>

      <div
        className={`
      absolute right-0 z-50 mt-2 w-48 rounded-lg bg-amber-100 text-center shadow-lg transition-all duration-300 ease-out
      ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'}
    `}
      >
        <ul className="p-2 space-y-1">
          <li>
            <Link
              href={`/${currentLocale}/my-profile`}
              className="block rounded-lg px-4 py-2 hover:bg-gray-100"
            >
              Мой профиль
            </Link>
          </li>

          {isAdmin && (
            <li>
              <Link
                href={`/${currentLocale}/admin`}
                className="block rounded-lg px-4 py-2 font-medium text-green-700 hover:bg-green-100"
              >
                Админ-панель
              </Link>
            </li>
          )}

          <li>
            <form action={logout}>
              <Button
                variant="ghost"
                className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
              >
                Выйти
              </Button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
