import React from 'react';
import BookList from '@/components/BookList';
import BookOverview from '@/components/BookOverview';
import { books } from '@/database/schema';
import { db } from '@/database/drizzle';
import { auth } from '@/auth';
import { desc } from 'drizzle-orm';
import { getTranslations } from 'next-intl/server';

const Home = async () => {
  const session = await auth();
  const t = await getTranslations('HomePage');

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      <BookList
        title={t('newBooks')}
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
