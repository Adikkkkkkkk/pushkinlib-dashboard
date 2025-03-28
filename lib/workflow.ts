import { Client as WorkflowClient } from '@upstash/workflow';
import { Client as QStashClient, resend } from '@upstash/qstash';
import config from '@/lib/config';

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    console.log('Отправка письма через QStash:', { email, subject, message });

    const response = await qstashClient.publishJSON({
      api: {
        name: 'email',
        provider: resend({ token: config.env.resendToken }),
      },
      body: {
        from: '<contact@adil-rakhimov.ru>',
        to: [email],
        subject,
        html: message,
      },
    });

    console.log('Ответ от QStash:', response);
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
  }
};
