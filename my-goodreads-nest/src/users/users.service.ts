import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'argon2';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from '../database/database-connection.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import * as schema from './schema.js';
import { users } from './schema.js';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async getUsers() {
    return this.database.query.users.findMany();
  }

  async findUserByEmail(email: string) {
    return await this.database.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async findUserById(id: string) {
    return await this.database.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  async createUser(user: typeof schema.users.$inferInsert) {
    const existingEmail = await this.database.query.users.findFirst({
      where: eq(users.email, user.email),
    });

    if (existingEmail) {
      throw new BadRequestException('Email already exists.');
    }

    const [data] = await this.database
      .insert(schema.users)
      .values({
        ...user,
        password: await hash(user.password),
      })
      .returning();
    return data;
  }

  async updateUser(id: string, data: UpdateUserDto) {
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

    const [updatedUser] = await this.database
      .update(schema.users)
      .set(data)
      .where(eq(schema.users.id, id))
      .returning();

    return updatedUser;
  }

  async removeUser(id: string) {
    const existingUser = await this.database.query.users.findFirst({
      where: eq(schema.users.id, id),
    });

    if (existingUser === undefined) {
      throw new NotFoundException(`No user ID: ${id}`);
    }

    await this.database.delete(schema.users).where(eq(schema.users.id, id));

    return { id };
  }
}
