import {
  varchar,
  integer,
  text,
  pgTable,
  uuid,
  pgEnum,
  date,
  timestamp,
  json,
} from 'drizzle-orm/pg-core';

export const STATUS_ENUM = pgEnum('status', [
  'PENDING',
  'APPROVED',
  'REJECTED',
]);
export const ROLE_ENUM = pgEnum('role', ['USER', 'ADMIN']);
export const BORROW_STATUS_ENUM = pgEnum('borrow_status', [
  'BORROWED',
  'RETURNED',
]);

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  libraryId: integer('library_id').notNull().unique(),
  password: text('password').notNull(),
  libraryCard: text('library_card').notNull(),
  status: STATUS_ENUM('status').default('PENDING'),
  role: ROLE_ENUM('role').default('USER'),
  lastActivityDate: date('last_activity_date').defaultNow(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
  }).defaultNow(),
});

export const books = pgTable('books', {
  id: uuid('id').primaryKey().notNull().defaultRandom().unique(),

  title: json('title')
    .notNull()
    .$type<{ kk: string; ru: string; en: string }>(),
  author: json('author')
    .notNull()
    .$type<{ kk: string; ru: string; en: string }>(),
  genre: json('genre')
    .notNull()
    .$type<{ kk: string; ru: string; en: string }>(),
  description: json('description')
    .notNull()
    .$type<{ kk: string; ru: string; en: string }>(),
  summary: json('summary')
    .notNull()
    .$type<{ kk: string; ru: string; en: string }>(),

  rating: integer('rating').notNull(),
  totalCopies: integer('total_copies').notNull().default(1),
  availableCopies: integer('available_copies').notNull().default(1),

  coverUrl: text('cover_url').notNull(),
  coverColor: text('cover_color').notNull(),
  videoUrl: text('video_url').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const borrowRecords = pgTable('borrow_records', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  bookId: uuid('book_id')
    .references(() => books.id)
    .notNull(),
  borrowDate: timestamp('borrow_date', { withTimezone: true })
    .defaultNow()
    .notNull(),
  dueDate: date('due_date').notNull(),
  returnDate: date('return_date'),
  status: BORROW_STATUS_ENUM('status').default('BORROWED').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
