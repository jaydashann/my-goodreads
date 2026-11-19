import { Inject, Injectable } from '@nestjs/common';
import { and, inArray } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../database/database-connection.js';
import type { AppRawDbConnection } from '../database/db.js';
import { Role } from '../users/dto/create-user.dto.js';
import { roleSystemModulesTable } from './schema.js';

@Injectable()
export class SystemModuleService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly dbClient: AppRawDbConnection,
  ) {}

  async getSystemModules({
    filters,
  }: {
    filters: { roles?: Role[] | undefined };
  }) {
    const whereConstraints = and(
      filters.roles === undefined
        ? undefined
        : inArray(roleSystemModulesTable.role, filters.roles),
    );

    const records = await this.dbClient
      .select({
        module: roleSystemModulesTable.module,
      })
      .from(roleSystemModulesTable)
      .where(whereConstraints);

    return records.map(({ module }) => module);
  }
}
