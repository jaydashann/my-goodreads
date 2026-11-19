import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service.js';
import { AuthService } from '../auth.service.js';
import { TokenPayload } from '../token-payload.interface.js';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Authentication,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const { sub, jti } = payload;

    if (sub === undefined) {
      throw new UnauthorizedException('Token does not define Subject.');
    }

    if (jti === undefined) {
      throw new UnauthorizedException('Token does not define JWT Token ID.');
    }

    return this.authService.verifyUserRefreshToken({
      refreshToken: request.cookies?.Refresh ?? '',
      sub,
      jti,
    });
  }
}
