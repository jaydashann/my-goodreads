import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { eq, and, ne, isNull } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../database/database-connection.js';
import * as schema from './schema.js'
import { CreateBookDto } from './dto/create-book.dto.js';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { COVERS_DIR } from './cover-upload.js';

@Injectable()
export class BooksService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
    ) {}

    private async deleteCoverFile(filename?: string | null) {
        if (!filename) return;
        await unlink(join(COVERS_DIR, filename)).catch(() => {});
    }

    async getBooks() {
        return this.database.query.books.findMany();
    }

    async createBook(userId: string, book: CreateBookDto, coverImage?: string) {
        const { ...rest } = book;

        return this.database.insert(schema.books).values({
            ...rest,
            user_id: userId,
            book_cover: coverImage ?? null,
        }).returning();
    }

    async updateBook(id: string, data: UpdateBookDto, coverImage?:string) {
        const existingBook = await this.database.query.books.findFirst({
            where: eq(schema.books.id, id),
        });

        if (existingBook === undefined) {
            throw new NotFoundException(`No book ID: ${id}`);
        }

        const title = data.title ?? existingBook.title;
        const author = data.author ?? existingBook.author;

        if (title !== existingBook.title || author !== existingBook.author) {
            const duplicate = await this.database.query.books.findFirst({
                where: and(
                    ne(schema.books.id, id),
                    title === null
                        ? isNull(schema.books.title)
                        : eq(schema.books.title, title),
                    author === null 
                        ? isNull(schema.books.author)
                        : eq(schema.books.author, author),
                ),
            });

            if (duplicate !== undefined) {
                throw new ConflictException(
                    `A book titled "${title}" by ${author} already exists.`
                );
            }
        }

        const [updatedBook] = await this.database
            .update(schema.books)
            .set({ ...data, ...(coverImage && { book_cover: coverImage }) })
            .where(eq(schema.books.id, id))
            .returning();
        
        if (coverImage) await this.deleteCoverFile(existingBook.book_cover); 
        return updatedBook;
    }

    async removeBook(id: string) {
        const existingBook = await this.database.query.books.findFirst({
            where: eq(schema.books.id, id)
        });

        if (existingBook === undefined) {
            throw new NotFoundException(`No book ID: ${id}`);
        }

        await this.database
            .delete(schema.books)
            .where(eq(schema.books.id, id));
        
        await this.database.delete(schema.books).where(eq(schema.books.id, id));
        await this.deleteCoverFile(existingBook.book_cover);
        return { id };
    }
}
