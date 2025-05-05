import React from 'react';
import Image from 'next/image';
import BookCover from './BookCover';
import BorrowBook from './BorrowBook';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { getTranslations } from 'next-intl/server';

interface Props extends Book {
  userId: string;
  locale: 'kk' | 'ru' | 'en';
}

const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  id,
  userId,
  locale,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) return null;

  const t = await getTranslations('BookOverview');

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user.status === 'APPROVED',
    message:
      availableCopies <= 0
        ? t('borrowingEligibilityTrue')
        : t('borrowingEligibilityFalse'),
  };

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title[locale]}</h1>

        <div className="book-info">
          <p>
            Автор{' '}
            <span className="font-semibold text-primary">{author[locale]}</span>
          </p>
          <p>
            Жанр{' '}
            <span className="font-semibold text-primary">{genre[locale]}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Всего экземпляров:
            <span className="font-semibold text-light-200">{totalCopies}</span>
          </p>

          <p>
            Доступно экземпляров:
            <span className="font-semibold text-light-200">
              {availableCopies}
            </span>
          </p>
        </div>

        <p className="book-description">{description[locale]}</p>

        <BorrowBook
          bookId={id}
          userId={userId}
          borrowingEligibility={borrowingEligibility}
        />
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />

          <div className="absolute left-16 top-10 rotate-12 opacity-40 blur-sm max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
