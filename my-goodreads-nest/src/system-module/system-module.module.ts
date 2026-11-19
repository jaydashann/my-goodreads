import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { SystemModuleController } from './sustem-module.controller.js';
import { SystemModuleService } from './system-module.service.js';

@Module({
  imports: [DatabaseModule],
  providers: [SystemModuleService],
  controllers: [SystemModuleController],
})
export class SystemModuleModule {}
