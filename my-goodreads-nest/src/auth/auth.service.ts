import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from '../database/database-connection.js';
import { UsersService } from '../users/users.service.js';

type AuthResult = { accessToken: string; id: string; username: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({
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

<<<<<<< HEAD
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
=======
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

    response.cookie('Authentication', accessToken, {
      // domain: localhost
      httpOnly: true,
      secure: NODE_ENV === 'production',
      expires: expiresRefreshToken,
    });

>>>>>>> bdf7d93 (feat: auth completed with modules and roles guard)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
