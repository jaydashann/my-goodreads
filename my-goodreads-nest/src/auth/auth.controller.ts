import {
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { Request } from 'express';
import { Public } from '../common/decorators/public.decorator.js';
import type { User } from '../database/index.js';
import { UserRecord } from '../users/schema.js';
import { AuthService } from './auth.service.js';
import { CurrentUser } from './current-user.decorator.js';
import { JwtAuthGuard } from './guard/jwt.guard.js';
import { LocalAuthGuard } from './guard/local-auth.guard.js';
import { OptionalJwtAuthGuard } from './guard/optional-jwt.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.createAuthTokens(user, response);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Delete('logout')
  async logout(
    @Req()
    req: Request & {
      user?: UserRecord | null | undefined;
      cookies?: Record<string, string> | null | undefined;
    },
    @Res() res: Response,
  ): Promise<void> {
    await this.authService.logout({
      req,
      res,
    });
  }
  // async logout(@Request() req: any) {
  //   await new Promise<void>((resolve, reject) =>
  //     req.logout((err: any) => (err ? reject(err) : resolve())),
  //   );
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req: any) {
  //   return req.user;
  // }
}
