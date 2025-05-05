interface Book {
  id: string;
  title: Record<'kk' | 'ru' | 'en', string>;
  author: Record<'kk' | 'ru' | 'en', string>;
  genre: Record<'kk' | 'ru' | 'en', string>;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: Record<'kk' | 'ru' | 'en', string>;
  summary: Record<'kk' | 'ru' | 'en', string>;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  createdAt: Date | null;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  libraryId: number;
  libraryCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}
