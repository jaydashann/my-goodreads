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
<<<<<<< HEAD
import * as schema from './schema.js';
import { users } from './schema.js';
=======
// import * as schema from './schema.js';
import type { AppRawDbConnection } from '../database/db.js';
import { users } from '../database/index.js';
import { VALID_MODULES_FOR_ADMIN_ROLE } from '../system-module/system-module.enum.js';
import { Role } from './dto/create-user.dto.js';
import { UserRecord, userRefreshTokensTable, usersTable } from './schema.js';
>>>>>>> bdf7d93 (feat: auth completed with modules and roles guard)

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: AppRawDbConnection,
  ) {}

  async getUsers() {
    return this.database.query.users.findMany();
  }

  async findUserByEmail(email: string) {
    return await this.database.query.users.findFirst({
<<<<<<< HEAD
      where: eq(users.email, email),
=======
      where: eq(usersTable.email, email),
>>>>>>> bdf7d93 (feat: auth completed with modules and roles guard)
    });
  }

  async findUserById(id: string) {
    return await this.database.query.users.findFirst({
<<<<<<< HEAD
      where: eq(users.id, id),
    });
  }

  async createUser(user: typeof schema.users.$inferInsert) {
    const existingEmail = await this.database.query.users.findFirst({
      where: eq(users.email, user.email),
=======
      where: eq(usersTable.id, id),
    });
  }

  public async createUserRefreshToken({
    currentUser,
    tokenId,
    tokenValue,
    tokenExpiresAt,
  }: {
    currentUser: UserRecord;
    tokenId: string;
    tokenValue: string;
    tokenExpiresAt: Date;
  }) {
    const [userRefreshTokenRecord] = await this.database
      .insert(userRefreshTokensTable)
      .values({
        id: tokenId,
        token: tokenValue,
        userId: currentUser.id,
        expiresAt: tokenExpiresAt,
      })
      .returning();

    return {
      userRefreshTokenRecord,
    };
  }

  async updateUserRefreshToken({
    currentUser,
    tokenId,
    tokenValue,
    tokenExpiresAt,
    dateNow,
  }: {
    currentUser: UserRecord;
    tokenId: string;
    tokenValue: string;
    tokenExpiresAt: Date;
    dateNow: Date;
  }) {
    const userRefreshTokenRecords = await this.database
      .update(userRefreshTokensTable)
      .set({
        id: tokenId,
        token: tokenValue,
        expiresAt: tokenExpiresAt,
        updatedAt: dateNow,
      })
      .where(
        and(
          eq(userRefreshTokensTable.id, tokenId),
          eq(userRefreshTokensTable.userId, currentUser.id),
        ),
      )
      .returning();

    if (userRefreshTokenRecords.length === 0) {
      throw new UnauthorizedException(`No such token with Id ${tokenId}`);
    }

    const [userRefreshTokenRecord] = userRefreshTokenRecords;

    return {
      userRefreshTokenRecord,
    };
  }

  async invalidateUserRefreshToken({
    currentUser,
    tokenId,
    dateNow,
  }: {
    currentUser: UserRecord;
    tokenId: string;
    dateNow: Date;
  }) {
    const userRefreshTokenRecords = await this.database
      .update(userRefreshTokensTable)
      .set({
        id: tokenId,
        expiresAt: dateNow,
        updatedAt: dateNow,
      })
      .where(
        and(
          eq(userRefreshTokensTable.id, tokenId),
          eq(userRefreshTokensTable.userId, currentUser.id),
        ),
      )
      .returning();

    if (userRefreshTokenRecords.length === 0) {
      throw new UnauthorizedException(`No such token with ID ${tokenId}`);
    }

    const [userRefreshTokenRecord] = userRefreshTokenRecords;

    return {
      userRefreshTokenRecord,
    };
  }

  async createUser(user: typeof usersTable.$inferInsert) {
    const existingEmail = await this.database.query.users.findFirst({
      where: eq(usersTable.email, user.email),
>>>>>>> bdf7d93 (feat: auth completed with modules and roles guard)
    });

    if (existingEmail) {
      throw new BadRequestException('Email already exists.');
    }

    const [data] = await this.database
<<<<<<< HEAD
      .insert(schema.users)
=======
      .insert(usersTable)
>>>>>>> bdf7d93 (feat: auth completed with modules and roles guard)
      .values({
        ...user,
        password: await hash(user.password),
      })
      .returning();
    return data;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const existingUser = await this.database.query.users.findFirst({
<<<<<<< HEAD
      where: eq(schema.users.id, id),
=======
      where: eq(usersTable.id, id),
>>>>>>> bdf7d93 (feat: auth completed with modules and roles guard)
    });

    if (existingUser === undefined) {
      throw new NotFoundException(`No user ID: ${id}`);
    }

    if (data.email !== undefined && data.email !== existingUser.email) {
      const emailTaken = await this.database.query.users.findFirst({
<<<<<<< HEAD
        where: eq(schema.users.email, data.email),
=======
        where: eq(usersTable.email, data.email),
>>>>>>> bdf7d93 (feat: auth completed with modules and roles guard)
      });

      if (emailTaken !== undefined) {
        throw new ConflictException(`Email already exists: ${data.email}`);
      }
    }

    const [updatedUser] = await this.database
<<<<<<< HEAD
      .update(schema.users)
      .set(data)
      .where(eq(schema.users.id, id))
=======
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
>>>>>>> bdf7d93 (feat: auth completed with modules and roles guard)
      .returning();

    return updatedUser;
  }

  async removeUser(id: string) {
    const existingUser = await this.database.query.users.findFirst({
<<<<<<< HEAD
      where: eq(schema.users.id, id),
=======
      where: eq(usersTable.id, id),
>>>>>>> bdf7d93 (feat: auth completed with modules and roles guard)
    });

    if (existingUser === undefined) {
      throw new NotFoundException(`No user ID: ${id}`);
    }

<<<<<<< HEAD
    await this.database.delete(schema.users).where(eq(schema.users.id, id));
=======
    await this.database.delete(usersTable).where(eq(usersTable.id, id));
>>>>>>> bdf7d93 (feat: auth completed with modules and roles guard)

    return { id };
  }
}
