import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, eq, isNull, ne } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { DATABASE_CONNECTION } from '../database/database-connection.js';
import { COVERS_DIR } from './cover-upload.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import * as schema from './schema.js';
import { booksTable } from './schema.js';

@Injectable()
export class BooksService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  private async deleteCoverFile(filename?: string | null) {
    if (!filename) return;
    await unlink(join(COVERS_DIR, filename)).catch(() => {});
  }

  async getBooks(userId: string) {
    return this.database.query.booksTable.findMany({
      where: eq(booksTable.user_id, userId),
    });
  }

  async getBookById(userId: string, id: string) {
    return await this.database.query.booksTable.findFirst({
      where: and(eq(booksTable.user_id, userId), eq(booksTable.id, id)),
    });
  }

  async createBook(userId: string, book: CreateBookDto, coverImage?: string) {
    const { ...rest } = book;

    return this.database
      .insert(schema.booksTable)
      .values({
        ...rest,
        user_id: userId,
        book_cover: coverImage ?? null,
      })
      .returning();
  }

  async updateBook(
    userId: string,
    id: string,
    data: UpdateBookDto,
    coverImage?: string,
  ) {
    const existingBook = await this.database.query.booksTable.findFirst({
      where: and(eq(booksTable.user_id, userId), eq(booksTable.id, id)),
    });

    if (existingBook === undefined) {
      throw new NotFoundException(`No book ID: ${id}`);
    }

    const title = data.title ?? existingBook.title;
    const author = data.author ?? existingBook.author;

    if (title !== existingBook.title || author !== existingBook.author) {
      const duplicate = await this.database.query.booksTable.findFirst({
        where: and(
          eq(schema.booksTable.user_id, userId),
          ne(schema.booksTable.id, id),
          title === null
            ? isNull(schema.booksTable.title)
            : eq(schema.booksTable.title, title),
          author === null
            ? isNull(schema.booksTable.author)
            : eq(schema.booksTable.author, author),
        ),
      });

      if (duplicate !== undefined) {
        throw new ConflictException(
          `A book titled "${title}" by ${author} already exists.`,
        );
      }
    }

    const [updatedBook] = await this.database
      .update(schema.booksTable)
      .set({ ...data, ...(coverImage && { book_cover: coverImage }) })
      .where(and(eq(booksTable.user_id, userId), eq(booksTable.id, id)))
      .returning();

    if (coverImage) await this.deleteCoverFile(existingBook.book_cover);
    return updatedBook;
  }

  async removeBook(userId: string, id: string) {
    const existingBook = await this.database.query.booksTable.findFirst({
      where: and(eq(booksTable.user_id, userId), eq(booksTable.id, id)),
    });

    if (existingBook === undefined) {
      throw new NotFoundException(`No book ID: ${id}`);
    }

    await this.database
      .delete(schema.booksTable)
      .where(and(eq(booksTable.user_id, userId), eq(booksTable.id, id)));

    await this.database
      .delete(schema.booksTable)
      .where(and(eq(booksTable.user_id, userId), eq(booksTable.id, id)));
    await this.deleteCoverFile(existingBook.book_cover);
    return { id };
  }
}
