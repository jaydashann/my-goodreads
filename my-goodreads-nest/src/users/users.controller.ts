import { 
    Body, 
    Controller, 
    Get, 
    Post, 
    Delete, 
    Patch, 
    Param,
    ParseIntPipe
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { ZodValidationPipe } from '../common/zod-validation.pipe.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import { userSchema } from './dto/create-user.dto.js';
import type { UpdateUserDto } from './dto/update-user.dto.js';
import {  UpdateUserSchema } from './dto/update-user.dto.js';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers() {
        return this.usersService.getUsers();
    }

    @Post()
    async createUser(
        @Body(new ZodValidationPipe(userSchema)) request: CreateUserDto
    ) {
        return this.usersService.createUser(request)
    }

    @Patch(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ZodValidationPipe(UpdateUserSchema)) request: UpdateUserDto,
    ) {
        return this.usersService.updateUser(id, request);
    }

    @Delete(':id')
    async removeUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.removeUser(id);
    }
}
