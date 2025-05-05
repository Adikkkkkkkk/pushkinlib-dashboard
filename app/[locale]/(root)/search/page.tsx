import { sampleBooks } from '@/app/constants';
import BookList from '@/components/BookList';
import SearchBar from '@/components/SearchBar'; // добавим ниже
import React from 'react';

const Page = () => {
  return (
    <div className="space-y-10">
      <SearchBar />
      <BookList title="Результаты поиска" books={sampleBooks} />
    </div>
  );
};

export default Page;
