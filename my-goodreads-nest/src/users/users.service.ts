import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../database/database-connection.js';
import * as schema from './schema.js';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>,
    ) {}

    async getUsers() {
        return this.database.query.users.findMany();
    }

    async createUser(user: typeof schema.users.$inferInsert) {
        await this.database.insert(schema.users).values(user);
    }

    async updateUser(id: number, data: UpdateUserDto) {
        const existingUser = await this.database.query.users.findFirst({
            where: eq(schema.users.id, id),
        });

        if (existingUser === undefined) {
            throw new NotFoundException(`No user ID: ${id}`);
        }

        if (data.email !== undefined && data.email !== existingUser.email) {
            const emailTaken = await this.database.query.users.findFirst({
                where: eq(schema.users.email, data.email),
            });

            if (emailTaken !== undefined) {
                throw new ConflictException(`Email already exists: ${data.email}`);
            }
        }

        const [ updatedUser ] = await this.database
            .update(schema.users)
            .set(data)
            .where(eq(schema.users.id, id))
            .returning();

        return updatedUser;
    }

    async removeUser(id: number) {
        const existingUser = await this.database.query.users.findFirst({
            where: eq(schema.users.id, id),
        });

        if (existingUser === undefined) {
            throw new NotFoundException(`No user ID: ${id}`);
        }

        await this.database
            .delete(schema.users)
            .where(eq(schema.users.id, id));

        return { id };
    }
}
