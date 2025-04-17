import { useState } from 'react';
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

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Avatar className="cursor-pointer">
        <AvatarFallback className="bg-amber-100">
          {getInitials(userName || 'IN')}
        </AvatarFallback>
      </Avatar>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
          <ul className="p-2 space-y-1">
            <li>
              <Link
                href={`/${currentLocale}/my-profile`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Мой профиль
              </Link>
            </li>
            <li>
              <form action={logout}>
                <Button variant="ghost" className="w-full text-left px-4 py-2">
                  Выйти
                </Button>
              </form>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
