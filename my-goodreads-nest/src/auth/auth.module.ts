import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module.js';
import { UsersModule } from '../users/users.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtRefreshStrategy } from './strategies/jwt-refresh-strategy.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { LocalStrategy } from './strategies/local.strategy.js';

@Module({
  imports: [DatabaseModule, JwtModule, UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
