import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard.js';
import { SystemModuleService } from './system-module.service.js';

@Controller('system-modules')
export class SystemModuleController {
  constructor(private readonly systemModuleService: SystemModuleService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllSystemModules() {
    // tbc
  }
}
