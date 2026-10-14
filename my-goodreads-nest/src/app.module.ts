import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module.js';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module.js';
import { BooksModule } from './books/books.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    BooksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
