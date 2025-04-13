'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { bookSchema } from '@/lib/validations';
import { Textarea } from '@/components/ui/textarea';
import FileUpload from '@/components/FileUpload';
import ColorPicker from '../СolorPicker';
import { createBook } from '@/lib/admin/actions/book';
import { toast } from '@/hooks/use-toast';

interface Props extends Partial<Book> {
  type: 'create' | 'update';
}

const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      description: '',
      author: '',
      genre: '',
      rating: 1,
      totalCopies: 1,
      coverUrl: '',
      coverColor: '',
      videoUrl: '',
      summary: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    const result = await createBook(values);

    if (result.success) {
      toast({
        title: 'Успешно!',
        description: 'Книга была успешно добавлена в библиотеку.',
      });

      router.push(`/admin/books/${result.data.id}`);
    } else {
      toast({
        title: 'Ошибка!',
        description: result.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={'title'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-bold text-dark-500">
                Название книги
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Введите название книги"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'author'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-bold text-dark-500">
                Автор книги
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Введите имя автора книги"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'genre'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-bold text-dark-500">
                Жанр книги
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Введите жанр книги"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'rating'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-bold text-dark-500">
                Рейтинг книги
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Введите рейтинг книги"
                  type="number"
                  min={1}
                  max={5}
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'totalCopies'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-bold text-dark-500">
                Количество экземпляров
              </FormLabel>
              <FormControl>
                <Input
                  required
                  min={1}
                  max={1000}
                  placeholder="Введите количество экземпляров"
                  type="number"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'coverUrl'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-bold text-dark-500">
                Обложка книги
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Загрзите URL обложки книги"
                  folder="books/covers"
                  variant="light"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'coverColor'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-bold text-dark-500">
                Цвет обложки книги
              </FormLabel>
              <FormControl>
                <ColorPicker
                  onPickerChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'description'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-bold text-dark-500">
                Описание книги
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Введите описание книги"
                  {...field}
                  rows={10}
                  className="book-form_input resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'videoUrl'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-bold text-dark-500">
                Видео обзор книги
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="video"
                  accept="video/*"
                  placeholder="Загрзите URL видео"
                  folder="books/videos"
                  variant="light"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'summary'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-bold text-dark-500">
                Сводка книги
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Введите сводку книги"
                  {...field}
                  rows={5}
                  className="book-form_input resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="book-form_btn text-white">
          Добавить книгу
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
