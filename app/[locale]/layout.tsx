import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';

const ibmPlexSans = localFont({
  src: [
    {
      path: '../fonts/IBMPlexSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    { path: '../fonts/IBMPlexSans-Medium.ttf', weight: '500', style: 'normal' },
    {
      path: '../fonts/IBMPlexSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    { path: '../fonts/IBMPlexSans-Bold.ttf', weight: '700', style: 'normal' },
  ],
});

const bebasNeue = localFont({
  src: [{ path: '../fonts/Oswald-Medium.ttf', weight: '400', style: 'normal' }],
  variable: '--bebas-neue',
});

export const metadata = {
  title: 'Pushkin Library Board',
  description: 'Pushkin Library Board - онлайн решение для библиотекарей',
};

type Props = {
  children: ReactNode;
  params: { locale: string };
};

const RootLayout = async (props: Props) => {
  const { children } = props;
  const { locale } = await props.params;
  const session = await auth();

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound(); // если язык не найден — 404
  }

  return (
    <html lang={locale}>
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
