'use client';

import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials, getName } from '@/lib/utils';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Profile = ({ locale }: { locale: string }) => {
  const { data: session } = useSession();

  if (!session?.user) {
    return <p>Вы не авторизованы</p>;
  }

  const { name, email, image, cardNumber, cardImageUrl, isAdmin } =
    session.user as {
      name?: string;
      email?: string;
      image?: string;
      cardNumber?: string;
      cardImageUrl?: string;
      isAdmin?: boolean;
    };

  return (
    <div className="w-full max-w-md pt-12 px-6 pb-6 bg-white shadow-md rounded-sm">
      <div className="flex justify-start items-center gap-10 mb-10">
        <Avatar className="w-16 h-16 text-white bg-primary text-xl">
          <AvatarFallback>{getInitials(name || 'IN')}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold text-gray-900">
            {getName(name || '')}
          </p>
          <p className="text-sm text-gray-600">{email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">Статус: </span>
          {isAdmin ? 'Администратор' : 'Пользователь'}
        </div>

        <div>
          <span className="font-medium">Читательский билет: </span>
          {cardNumber || 'не указан'}
        </div>

        {cardImageUrl && (
          <div className="mt-4">
            <span className="font-medium block mb-2">Фото билета:</span>
            <Image
              src={cardImageUrl}
              alt="Фото читательского билета"
              width={400}
              height={250}
              className="rounded-md border border-gray-200 shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
