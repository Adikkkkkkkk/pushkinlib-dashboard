'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import BookCover from '@/components/BookCover';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from './ui/button';

interface Props extends Book {
  locale: 'kk' | 'ru' | 'en';
}

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  locale,
  isLoanedBook = false,
}: Props) => {
  return (
    <li className={cn(isLoanedBook && 'xs:w-52 w-full')}>
      <Link
        href={`/${locale}/books/${id}`}
        className={cn(isLoanedBook && 'w-full flex flex-col items-center')}
      >
        <BookCover coverColor={coverColor} coverImage={coverUrl} />

        <div className={cn('mt-4', !isLoanedBook && 'xs:w-40 max-w-28')}>
          <p className="book-title">{title[locale]}</p>
          <p className="book-genre">{genre[locale]}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 дней до возврата книги</p>
            </div>

            <Button className="book-btn">Скачать чек</Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
