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
import { Textarea } from '@/components/ui/textarea';
import FileUpload from '@/components/FileUpload';
import ColorPicker from '../СolorPicker';
import { createBook } from '@/lib/admin/actions/book';
import { toast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';

const BookForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'ru';

  const form = useForm({
    resolver: zodResolver(z.any()),
    defaultValues: {
      title: { kk: '', ru: '', en: '' },
      author: { kk: '', ru: '', en: '' },
      genre: { kk: '', ru: '', en: '' },
      description: { kk: '', ru: '', en: '' },
      summary: { kk: '', ru: '', en: '' },
      rating: 1,
      totalCopies: 1,
      coverUrl: '',
      coverColor: '',
      videoUrl: '',
    },
  });

  const onSubmit = async (values) => {
    const result = await createBook(values);

    if (result.success) {
      toast({
        title: 'Успешно!',
        description: 'Книга была успешно добавлена в библиотеку.',
      });
      router.push(`${result.data.id}`);
    } else {
      toast({
        title: 'Ошибка!',
        description: result.message,
        variant: 'destructive',
      });
    }
  };

  const renderMultilangFields = (fieldName, label) => {
    return ['kk', 'ru', 'en'].map((lang) => (
      <FormField
        key={`${fieldName}.${lang}`}
        control={form.control}
        name={`${fieldName}.${lang}`}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className="text-base font-bold text-dark-500">
              {`${label} (${lang.toUpperCase()})`}
            </FormLabel>
            <FormControl>
              <Input
                required
                placeholder={`Введите ${label.toLowerCase()} (${lang})`}
                {...field}
                className="book-form_input"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {renderMultilangFields('title', 'Название книги')}
        {renderMultilangFields('author', 'Автор книги')}
        {renderMultilangFields('genre', 'Жанр книги')}
        {renderMultilangFields('description', 'Описание книги')}
        {renderMultilangFields('summary', 'Сводка книги')}

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
                  placeholder="Загрузите URL обложки книги"
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
                  placeholder="Загрузите URL видео"
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

        <Button type="submit" className="book-form_btn text-white">
          Добавить книгу
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
