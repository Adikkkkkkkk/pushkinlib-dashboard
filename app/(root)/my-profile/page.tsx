import { sampleBooks } from '@/app/constants';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import { signOut } from '@/auth';
import React from 'react';

const Page = () => {
  return (
    <>
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Выйти c аккаунта</Button>
      </form>

      <BookList title="Взятые книги" books={sampleBooks} />
    </>
  );
};

export default Page;
