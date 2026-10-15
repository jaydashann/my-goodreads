import { Injectable, Inject } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection.js';
import * as schema from './schema.js'
import { CreateBookDto } from './dto/create-book.dto.js';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class BooksService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
    ) {}

    async getBooks() {
        return this.database.query.books.findMany();
    }

    async createBook(book: CreateBookDto) {
        const { started_at, completed_at, ...rest } = book;

        return this.database.insert(schema.books).values({
            ...rest,
            user_id: 1,
            started_at: started_at ? new Date(started_at) : null,
            completed_at: completed_at ? new Date(completed_at) : null,
        }).returning();
    }
}
