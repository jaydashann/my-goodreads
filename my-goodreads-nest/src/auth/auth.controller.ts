import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator.js';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './guard/jwt.guard.js';
import { LocalAuthGuard } from './guard/local-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req: any) {
    await new Promise<void>((resolve, reject) =>
      req.logout((err: any) => (err ? reject(err) : resolve())),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
