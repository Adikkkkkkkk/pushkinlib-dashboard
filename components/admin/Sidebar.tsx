'use client';
import { adminSideBarLinks } from '@/app/constants';
import { cn, getInitials } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Session } from 'next-auth';
import AdminLanguageSwitcher from '@/components/admin/AdminLanguageSwitcher';

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <div className="admin-sidebar">
      <div>
        <Link href="/">
          <div className="logo">
            <Image
              src="/icons/admin/logo.svg"
              alt="logo"
              width={37}
              height={37}
            />
            <h1>Pushkin Library</h1>
          </div>
        </Link>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const linkPath = link.route.slice(1);
            const currentPath = pathname.split('/').slice(2).join('/');

            const isSelected =
              linkPath === 'admin'
                ? currentPath === 'admin'
                : currentPath === linkPath ||
                  currentPath.startsWith(linkPath + '/');

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    'link',
                    isSelected && 'bg-primary-admin shadow-sm'
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${isSelected ? 'brightness-0 invert' : ''} object-contain`}
                    />
                  </div>

                  <p className={cn(isSelected ? 'text-white' : 'text-dark')}>
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
          <AdminLanguageSwitcher />
        </div>
      </div>

      <div className="user">
        <Avatar>
          <AvatarFallback className="bg-amber-100">
            {getInitials(session?.user?.name || 'IN')}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{session?.user?.name}</p>
          <p className="text-xs text-light-500">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
