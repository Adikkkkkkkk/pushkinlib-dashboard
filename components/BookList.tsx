import React from 'react';
import BookCard from './BookCard';

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
  locale: 'kk' | 'ru' | 'en';
}

const BookList = ({ title, books, containerClassName, locale }: Props) => {
  if (books.length < 2) return;
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-3xl uppercase text-light-100">
        {title}
      </h2>

      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} {...book} locale={locale} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
