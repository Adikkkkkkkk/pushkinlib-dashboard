'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const locales = ['kk', 'ru', 'en'];

const AdminLanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname?.split('/')[1] || 'ru';
  const restOfPath = pathname?.split('/').slice(2).join('/') || '';

  const handleLocaleChange = (locale: string) => {
    router.replace(`/${locale}/${restOfPath}`);
  };

  return (
    <div className="link cursor-default">
      <div className="relative size-5">
        <Image
          src="/icons/admin/language.svg"
          alt="language"
          fill
          className="object-contain"
        />
      </div>

      <div className="flex items-center gap-2 text-sm font-bold text-black">
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className={`rounded-sm p-3 transition-colors hover:bg-gray-300 ${
              locale === currentLocale
                ? 'bg-primary-admin text-light-800 hover:bg-green-400 '
                : 'opacity-70'
            }`}
          >
            {locale}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminLanguageSwitcher;
