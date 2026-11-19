import {
  Inject,
  Injectable,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UndefinedForwardRefException } from '@nestjs/core/internal';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { and, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Request, Response } from 'express';
import { DATABASE_CONNECTION } from '../database/database-connection.js';
import type { AppRawDbConnection } from '../database/db.js';
import * as schema from '../database/index.js';
import { UserRecord, userRefreshTokensTable } from '../users/schema.js';
import { UsersService } from '../users/users.service.js';

type AuthResult = { accessToken: string; id: string; username: string };

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly dbClient: AppRawDbConnection,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async verifyUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> {
    try {
      const user = await this.usersService.findUserByEmail(email);

      if (!user) {
        throw new UnauthorizedException('Credentials not valid.');
      }

      const authenticated = await verify(user.password, password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      console.error('Login error: ', error);
      throw new UnauthorizedException('Invalid credentials.');
    }
  }

  async createAuthTokens(user: UserRecord, response: Response) {
    const dateNow = new Date();
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(
      expiresRefreshToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    const accessTokenId = crypto.randomUUID();
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        jti: accessTokenId,
      },
      {
        secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: `${this.configService.getOrThrow(
          'JWT_ACCESS_TOKEN_EXPIRATION_MS',
        )}ms`,
      },
    );

    const refreshTokenId = crypto.randomUUID();
    const refreshTokenExpiresIn = this.configService.getOrThrow(
      'JWT_REFRESH_TOKEN_EXPIRATION_MS',
    );

    const refreshTokenExpiresAt = new Date(
      dateNow.getTime() + Number(refreshTokenExpiresIn),
    );

    if (isNaN(refreshTokenExpiresAt.getTime())) {
      throw new PreconditionFailedException(
        'Refresh token expires at evaluted to invalid timestamp.',
      );
    }

    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
        jti: refreshTokenId,
      },
      {
        secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: `${refreshTokenExpiresIn}ms`,
      },
    );

    const NODE_ENV = this.configService.getOrThrow<string>('NODE_ENV');

    const hashedToken = await hash(refreshToken);
    await this.usersService.createUserRefreshToken({
      currentUser: user,
      tokenId: refreshTokenId,
      tokenValue: hashedToken,
      tokenExpiresAt: refreshTokenExpiresAt,
    });

    response.cookie('Refresh', refreshToken, {
      // domain: localhost
      httpOnly: true,
      secure: NODE_ENV === 'production',
      expires: expiresRefreshToken,
    });

    response.cookie('Refresh', refreshToken, {
      // domain: localhost
      httpOnly: true,
      secure: NODE_ENV === 'production',
      expires: expiresRefreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyUserRefreshToken({
    refreshToken,
    sub,
    jti,
  }: {
    refreshToken: string;
    sub: string;
    jti: string;
  }) {
    try {
      const user = await this.usersService.findUserById(sub);

      if (user === undefined) {
        throw new UnauthorizedException('No such User ID.');
      }

      const foundToken = await this.dbClient.query.userRefreshToken.findFirst({
        where: and(
          eq(userRefreshTokensTable.id, jti),
          eq(userRefreshTokensTable.userId, user.id),
        ),
      });

      if (foundToken === undefined) {
        throw new UnauthorizedException('No such Refresh Token ID.');
      }

      const authenticated = await verify(foundToken.token, refreshToken);

      if (!authenticated) {
        throw new UnauthorizedException('Refresh token is invalid.');
      }

      return {
        ...user,
        validatedRefreshToken: {
          sub,
          jti,
        },
      };
    } catch (err) {
      throw new UnauthorizedException('Refresh token could not be verified.');
    }
  }

  async logout({
    req,
    res,
  }: {
    req: Request & {
      user?: UserRecord | null | undefined;
      cookies?: Record<string, string> | null | undefined;
    };
    res: Response;
  }): Promise<void> {
    const currentUser = req.user;
    const refreshTokenValue = req.cookies?.Refresh;

    if (currentUser && refreshTokenValue) {
      try {
        const { payload } = this.jwtService.verify(refreshTokenValue, {
          secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
          complete: true,
        });

        if (typeof payload?.jti === 'string') {
          const { validatedRefreshToken } = await this.verifyUserRefreshToken({
            refreshToken: refreshTokenValue,
            jti: payload.jti,
            sub: currentUser.id,
          });

          const dateNow = new Date();
          const { userRefreshTokenRecord } =
            await this.usersService.invalidateUserRefreshToken({
              currentUser,
              tokenId: validatedRefreshToken.jti,
              dateNow,
            });
        }
      } catch {
        // If the refresh token could not be validated,
        // we can ignore the error and simply clear the
        // caller's cookies.
      }
    }

    res.clearCookie('Authentication', { path: '/' });
    res.clearCookie('Refresh', { path: '/' });
    res
      .status(200)
      .send({ message: 'Cookie cleared and logged out successfully' });
  }
}
