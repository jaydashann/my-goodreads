import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DefaultLogger, LogWriter } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as bookSchema from '../books/schema.js';
import * as userSchema from '../users/schema.js';
import { DATABASE_CONNECTION } from './database-connection.js';
import * as schema from './index.js';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL'),
        });

        const nestLogger = new Logger();

        class MyLogWritter implements LogWriter {
          write(message: string) {
            nestLogger.debug(message);
          }
        }

        const logger = new DefaultLogger({ writer: new MyLogWritter() });
        return drizzle(pool, {
          schema,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
