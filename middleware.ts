import { auth as middleware } from '@/auth'; // авторизация
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Создаем middleware для локализации
const intlMiddleware = createMiddleware(routing);

// Объединяем авторизацию и мультиязычность
export default async function combinedMiddleware(req, res) {
  // Сначала выполняем авторизацию
  await middleware(req, res);

  // Затем выполняем middleware для локализации
  return intlMiddleware(req, res);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*|auth|my-profile|books).*)',
};
