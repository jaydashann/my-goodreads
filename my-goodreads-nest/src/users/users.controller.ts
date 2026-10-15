import { Body, Controller, Get, Post, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { ZodValidationPipe } from '../common/zod-validation.pipe.js';
import type { CreateUserRequestDto } from './dto/create-user-request.dto.js';
import { userSchema } from './dto/create-user-request.dto.js';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers() {
        return this.usersService.getUsers();
    }

    @Post()
    async createUser(@Body(new ZodValidationPipe(userSchema)) request: CreateUserRequestDto) {
        return this.usersService.createUser(request)
    }

    @Patch('/:userId')
    async updateUser() {
        
    }

    @Delete('/:userId')
    async removeUser() {

    }
}
