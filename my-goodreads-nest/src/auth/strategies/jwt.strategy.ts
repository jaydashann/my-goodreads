import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service.js';
import { TokenPayload } from '../token-payload.interface.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Authentication,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    const dateNow = new Date();
    const { sub, jti } = payload;

    if (sub === undefined) {
      throw new UnauthorizedException('Token does not define Subject.');
    }

    const user = await this.usersService.findUserById(sub);

    if (!user) {
      throw new UnauthorizedException('Unathorized');
    }

    return {
      ...user,
      validatedAccessToken: {
        sub,
        jti,
      },
    };
  }
}
