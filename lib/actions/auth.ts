'use server';

import { signIn } from '@/auth';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import ratelimit from '../ratelimit';
import { redirect } from 'next/navigation';
import { workflowClient } from '../workflow';
import config from '@/lib/config';

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'email' | 'password'>
) => {
  const { email, password } = params;

  const ip = (await headers()).get('x-forwarder-for') || '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect('/too-fast');

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, 'Ошибка при авторизации');
    return { success: false, error: 'Ошибка при авторизации' };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, libraryId, password, libraryCard } = params;

  const ip = (await headers()).get('x-forwarder-for') || '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect('/too-fast');

  // Проверяем существует ли пользователь с таким email
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      success: false,
      error: 'Пользователь с таким email уже существует',
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      libraryId,
      password: hashedPassword,
      libraryCard,
    });

    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflow/onboarding`,
      body: {
        email,
        fullName,
      },
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, 'Ошибка при регистрации');
    return { success: false, error: 'Ошибка регистрации' };
  }
};
