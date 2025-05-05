import React from 'react';
import BookList from '@/components/BookList';
import BookOverview from '@/components/BookOverview';
import { books } from '@/database/schema';
import { db } from '@/database/drizzle';
import { auth } from '@/auth';
import { desc } from 'drizzle-orm';
import { getTranslations, getLocale } from 'next-intl/server';

const Home = async () => {
  const session = await auth();
  const t = await getTranslations('HomePage');
  const locale = await getLocale();

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  const hasBooks = latestBooks.length > 0;

  return (
    <>
      {hasBooks && (
        <BookOverview
          {...latestBooks[0]}
          userId={session?.user?.id as string}
          locale={locale}
        />
      )}

      <BookList
        title={t('newBooks')}
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
        locale={locale}
      />
    </>
  );
};

export default Home;
