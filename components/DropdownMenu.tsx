'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { logout } from '@/lib/actions/logout';
import { getInitials, getName } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const DropdownMenu = ({
  currentLocale,
  userName,
}: {
  currentLocale: string;
  userName?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const t = useTranslations('Header.DropDownMenu');

  // Закрытие при клике вне меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Получение isAdmin
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
    <div
      ref={menuRef}
      className="relative flex items-center justify-center gap-1.5 cursor-pointer"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <Avatar className="transition-all duration-200 ease-in-out hover:border-4 hover:bg-white">
        <AvatarFallback className="bg-primary text-primary-500 text-white">
          {getInitials(userName || 'IN')}
        </AvatarFallback>
      </Avatar>

      <p className="font-semibold text-dark-100 transition-all duration-200 ease-in-out hover:text-dark-300">
        {getName(userName || 'User')}
      </p>

      <div
        className={`absolute top-10 -right-10 z-50 mt-2 w-48 rounded-lg bg-primary text-white text-center shadow-lg transition-all duration-300 ease-out
        ${isOpen ? 'opacity-100 scale-100 visible' : 'pointer-events-none invisible scale-95 opacity-0'}
      `}
      >
        <ul className="p-2 space-y-1">
          <li>
            <Link
              href={`/${currentLocale}/my-profile`}
              className="block rounded-lg px-4 py-2 hover:bg-green-900"
            >
              {t('profile')}
            </Link>
          </li>

          {isAdmin && (
            <li>
              <Link
                href={`/${currentLocale}/admin`}
                className="block rounded-lg px-4 py-2 hover:bg-green-900"
              >
                {t('admin')}
              </Link>
            </li>
          )}

          <li>
            <form action={logout}>
              <Button
                variant="ghost"
                className="w-full px-4 py-2 text-left text-red-300 hover:bg-red-100"
              >
                {t('logout')}
              </Button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
