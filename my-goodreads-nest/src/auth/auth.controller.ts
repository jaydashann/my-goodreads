import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator.js';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './guard/jwt.guard.js';
import { LocalAuthGuard } from './guard/local-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
<<<<<<< HEAD
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req: any) {
    await new Promise<void>((resolve, reject) =>
      req.logout((err: any) => (err ? reject(err) : resolve())),
    );
=======
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.createAuthTokens(user, response);
  }

  @Delete('logout')
  @UseGuards(OptionalJwtAuthGuard)
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
>>>>>>> bdf7d93 (feat: auth completed with modules and roles guard)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
