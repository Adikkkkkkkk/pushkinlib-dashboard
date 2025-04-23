'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';

const locales = [
  { code: 'ru', label: 'Русский' },
  { code: 'kk', label: 'Қазақша' },
  { code: 'en', label: 'English' },
];

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname?.split('/')[1] || 'ru';
  const restOfPath = pathname?.split('/').slice(2).join('/') || '';

  const changeLocale = (newLocale: string) => {
    router.replace(`/${newLocale}/${restOfPath}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="default"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md border border-amber-200 px-3 py-2 hover:bg-amber-100"
      >
        {locales.find((l) => l.code === currentLocale)?.label || '🌐 Язык'}
      </Button>

      {isOpen && (
        <div className="animate-fade-in absolute right-0 z-50 mt-2 w-40 rounded-lg bg-amber-100 text-center shadow-lg">
          <ul className="p-2 space-y-1">
            {locales.map(({ code, label }) => (
              <li key={code}>
                <button
                  onClick={() => changeLocale(code)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher;
