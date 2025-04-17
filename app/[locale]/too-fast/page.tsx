import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Page = async () => {
  const session = await auth();

  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold uppercase text-light-100">
        🚦 Ошибка 429: Слишком много запросов! 🚦
      </h1>
      <p className="mt-3 max-w-xl text-center text-light-400">
        Похоже, вы слишком быстро нажимаете кнопки!
        <br /> Наш сервер уже задышал тяжело и просит передышку
      </p>

      <Link href={!session ? '/sign-in' : '/'}>
        <Button className="mt-5">На главную</Button>
      </Link>
    </main>
  );
};

export default Page;
