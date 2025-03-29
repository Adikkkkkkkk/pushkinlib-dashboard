import { userEmails } from '@/app/constants';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { sendEmail } from '@/lib/workflow';
import { serve } from '@upstash/workflow/nextjs';
import { eq } from 'drizzle-orm';

type UserState = 'non-active' | 'active';
type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return 'non-active';

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (
    timeDifference > THREE_DAYS_IN_MS &&
    timeDifference <= THIRTY_DAYS_IN_MS
  ) {
    return 'non-active';
  }

  return 'active';
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Welcome Email
  await context.run('new-signup', async () => {
    await sendEmail({
      email,
      subject: '📚 Добро пожаловать в библиотеку!',
      message: `
				<!DOCTYPE html>
				<html lang="ru">
				<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>Добро пожаловать</title>
						<style>
								body {
										font-family: Arial, sans-serif;
										background-color: #F8F8FF;
										margin: 0;
										padding: 0;
								}
								.container {
										max-width: 600px;
										margin: 0 auto;
										background-color: white;
										border-radius: 10px;
										box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
										overflow: hidden;
								}
								.header {
										background-color: #25388C;
										color: white;
										padding: 20px;
										text-align: center;
										font-size: 24px;
								}
								.content {
										padding: 20px;
										color: #333;
										text-align: left;
								}
								.btn {
										display: block;
										width: 80%;
										margin: 20px auto;
										text-align: center;
										background-color: #027A48;
										color: white;
										padding: 15px;
										font-size: 16px;
										border-radius: 5px;
										text-decoration: none;
								}
								.btn:hover {
										background-color: #2CC171;
								}
								.footer {
										background-color: #EED1AC;
										color: #464F6F;
										text-align: center;
										padding: 15px;
										font-size: 14px;
								}
								@media (max-width: 600px) {
										.btn {
												width: 90%;
										}
								}
						</style>
				</head>
				<body>
						<div class="container">
								<div class="header">
										📚 Добро пожаловать в библиотеку!
								</div>
								<div class="content">
										<p>Дорогой(ая) <strong>${fullName}</strong>,</p>
										<p>Мы рады приветствовать вас в системе бронирования книг Восточно-Казахстанской областной библиотеки им. А.С. Пушкина.</p>
										<p>Теперь тысячи книг доступны вам всего в несколько кликов.</p>
										<a href="https://your-library-url.com" class="btn">Перейти в каталог</a>
								</div>
								<div class="footer">
										© Восточно-Казахстанская областная библиотека им. А.С. Пушкина, 2025  
								</div>
						</div>
				</body>
				</html>
			`,
    });
  });

  await context.sleep('wait-for-3-days', 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run('check-user-state', async () => {
      return await getUserState(email);
    });

    if (state === 'non-active') {
      await context.run('send-email-non-active', async () => {
        await sendEmail({
          email,
          subject: `${userEmails.nonActive.subject} ${fullName}!`,
          message: userEmails.nonActive.message,
        });
      });
    } else if (state === 'active') {
      await context.run('send-email-active', async () => {
        await sendEmail({
          email,
          subject: userEmails.active.subject,
          message: `Привет, ${fullName}! ${userEmails.active.message}`,
        });
      });
    }

    await context.sleep('wait-for-1-month', 60 * 60 * 24 * 30);
  }
});
