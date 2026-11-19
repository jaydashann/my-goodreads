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

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
