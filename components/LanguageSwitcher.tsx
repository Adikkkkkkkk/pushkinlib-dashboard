'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';

const locales = [
  { code: 'kk', label: 'Қазақ' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname?.split('/')[1] || 'ru';
  const restOfPath = pathname?.split('/').slice(2).join('/') || '';

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

  const changeLocale = (newLocale: string) => {
    router.replace(`/${newLocale}/${restOfPath}`);
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative cursor-pointer">
      <Button
        variant="default"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-md px-3 py-2 text-white hover:bg-green-700"
      >
        {locales.find((l) => l.code === currentLocale)?.label || '🌐 Язык'}
      </Button>

      <div
        className={`
          absolute top-10 right-0 z-50 mt-2 w-40 rounded-lg bg-primary text-white text-center shadow-lg transition-all duration-300 ease-out
          ${isOpen ? 'opacity-100 scale-100 visible' : 'pointer-events-none invisible scale-95 opacity-0'}
        `}
      >
        <ul className="p-2 space-y-1">
          {locales.map(({ code, label }) => (
            <li key={code}>
              <button
                onClick={() => changeLocale(code)}
                className="w-full rounded-lg px-4 py-2 text-left hover:bg-green-900 hover:text-white"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
