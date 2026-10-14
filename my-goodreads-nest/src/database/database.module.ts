import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from './database-connection.js';
import { ConfigService } from '@nestjs/config';
import * as userSchema from '../users/schema.js'
import * as bookSchema from '../books/schema.js'
import { Pool } from 'pg';

@Module({
    providers: [
        {
            provide: DATABASE_CONNECTION,
            useFactory: (configService: ConfigService) => {
                const pool = new Pool({
                    connectionString: configService.getOrThrow('DATABASE_URL'),
                });
                return drizzle(pool, {
                    schema: {
                        ...userSchema,
                        ...bookSchema,
                    },
                });
            },
            inject: [ConfigService],
        },
    ],
    exports: [DATABASE_CONNECTION]
})
export class DatabaseModule {}
