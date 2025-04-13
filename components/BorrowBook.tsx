'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { borrowBook } from '@/lib/actions/book';

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility?: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({ userId, bookId, borrowingEligibility }: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  if (!borrowingEligibility) return null;

  const { isEligible, message } = borrowingEligibility;

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast({
        title: 'Ошибка',
        description: message,
        variant: 'destructive',
      });
      return;
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast({
          title: 'Успех',
          description: 'Книга успешно забронирована',
        });

        router.push('/my-profile');
      } else {
        toast({
          title: 'Ошибка',
          description: 'Проблема с бронированием книги',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Проблема с бронированием книги',
        variant: 'destructive',
      });
      console.log(error);
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl uppercase text-dark-100">
        {borrowing ? 'Бронирование...' : 'Забронировать книгу'}
      </p>
    </Button>
  );
};

export default BorrowBook;
