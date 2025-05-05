import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import React from 'react';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import BookOverview from '@/components/BookOverview';
import { auth } from '@/auth';
import BookVideo from '@/components/BookVideo';
import { getLocale } from 'next-intl/server';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const locale = await getLocale();

  //Фетчинг данных книги по id
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(2);

  const summary = (bookDetails.summary as any)?.[locale] || '';

  if (!bookDetails) redirect('/404');

  console.log(bookDetails);

  return (
    <>
      <BookOverview
        {...bookDetails}
        userId={session?.user?.id as string}
        locale={locale}
      />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Видео</h3>

            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Краткое описаниие</h3>

            <div className="space-y-5 text-xl text-light-100">
              {summary.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>

        {/* <Похожие книги> */}
      </div>
    </>
  );
};

export default Page;
