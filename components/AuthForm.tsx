'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { ZodType } from 'zod';
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
import Link from 'next/link';
import Image from 'next/image';
import { FIELD_NAMES, FIELD_TYPES } from '@/app/constants';
import FileUpload from './FileUpload';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: 'SIGN_IN' | 'SIGN_UP';
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();

  const t = useTranslations('AuthForm');
  const locale = useLocale();
  const localizedFieldNames = FIELD_NAMES[locale as keyof typeof FIELD_NAMES];

  const [isHovered, setIsHovered] = useState(false);

  const isSignIn = type === 'SIGN_IN';
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: t('susscessToast.title'),
        description: isSignIn
          ? t('susscessToast.descriptionSignIn')
          : t('susscessToast.descriptionSignUp'),
      });

      router.push('/');
    } else {
      toast({
        title: isSignIn
          ? t('errorToast.titleSignIn')
          : t('errorToast.titleSignUp'),
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-black">
        {isSignIn ? t('signIn.greeting.title') : t('signUp.greeting.title')}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? t('signIn.greeting.subtitle')
          : t('signUp.greeting.subtitle')}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="nth-word:capitalize">
                    {
                      localizedFieldNames[
                        field.name as keyof typeof localizedFieldNames
                      ]
                    }
                    {field.name === 'libraryCard' && (
                      <div className="relative inline ">
                        <span
                          className={
                            isHovered
                              ? 'absolute -right-44 -top-20 w-96 rounded-md bg-white p-4 text-sm font-normal  text-light-100'
                              : 'hidden'
                          }
                        >
                          {localizedFieldNames.libraryCardWarning}
                        </span>
                        <Image
                          src="/icons/info.svg"
                          alt="info"
                          width={20}
                          height={20}
                          className="ml-1 inline-block cursor-pointer"
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        />
                      </div>
                    )}
                  </FormLabel>
                  <FormControl>
                    {field.name === 'libraryCard' ? (
                      <FileUpload
                        type="image"
                        accept="image/*"
                        placeholder={t('signUp.libraryCardImage.placeholder')}
                        folder="ids"
                        variant="light"
                        onFileChange={field.onChange}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            {isSignIn ? t('signIn.button.text') : t('signUp.button.text')}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? t('signIn.noAccount.text') : t('signUp.noAccount.text')}
        <Link
          href={isSignIn ? '/sign-up' : '/sign-in'}
          className="ml-2 font-bold text-primary"
        >
          {isSignIn ? t('signIn.noAccount.link') : t('signUp.noAccount.link')}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
