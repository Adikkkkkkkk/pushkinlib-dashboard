import { db } from '@/database/drizzle';
import { books, borrowRecords } from '@/database/schema';
import { and, eq } from 'drizzle-orm';
import { type InferSelectModel } from 'drizzle-orm';
import { auth } from '@/auth';

import BookList from '@/components/BookList';
import React from 'react';
import Profile from '@/components/Profile';

const Page = async ({ params }: { params: { locale: string } }) => {
  const locale = params.locale;
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return <div>Вы не авторизованы</div>;

  // Получаем все брони пользователя, статус которых = 'BORROWED'
  const borrowedBooks = await db
    .select({
      book: books, // Вытаскиваем все поля из books
    })
    .from(borrowRecords)
    .where(
      and(
        eq(borrowRecords.userId, userId),
        eq(borrowRecords.status, 'BORROWED')
      )
    )
    .innerJoin(books, eq(borrowRecords.bookId, books.id));

  const bookList = borrowedBooks.map(
    (record: { book: InferSelectModel<typeof books> }) => record.book
  );

  return (
    <div className="w-full gap-40 flex items-start justify-between">
      <Profile locale={locale} />
      <BookList locale={locale} title="Взятые книги" books={bookList} />
    </div>
  );
};

export default Page;
