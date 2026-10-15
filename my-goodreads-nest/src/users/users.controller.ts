import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserRequestDto } from './dto/create-user-request.dto.js';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers() {
        return this.usersService.getUsers();
    }

    @Post()
    async createUser(@Body() request: CreateUserRequestDto) {
        return this.usersService.createUser(request)
    }
}
