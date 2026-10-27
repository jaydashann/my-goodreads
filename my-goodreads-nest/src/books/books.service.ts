import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { eq, and, ne } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../database/database-connection.js';
import * as schema from './schema.js'
import { CreateBookDto } from './dto/create-book.dto.js';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BooksService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
    ) {}

    async getBooks() {
        return this.database.query.books.findMany();
    }

    async createBook(userId: string, book: CreateBookDto, coverImage?: string) {
        const { started_at, completed_at, ...rest } = book;

        return this.database.insert(schema.books).values({
            ...rest,
            user_id: userId,
            book_cover: coverImage ?? null,
        }).returning();
    }

    async updateBook(id: string, data: UpdateBookDto) {
        const existingBook = await this.database.query.books.findFirst({
            where: eq(schema.books.id, id),
        });

        if (existingBook === undefined) {
            throw new NotFoundError(`No book ID: ${id}`);
        }

        const title = data.title ?? existingBook.title;
        const author = data.author ?? existingBook.author;

        if (title !== existingBook.title || author !== existingBook.author) {
            const duplicate = await this.database.query.books.findFirst({
                where: and(
                    eq(schema.books.title, title),
                    eq(schema.books.author, author),
                    ne(schema.books.id, id)
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
            .set(data)
            .where(eq(schema.books.id, id))
            .returning();
        
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
        
        return { id };
    }
}
