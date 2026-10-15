import { IsEmail } from 'class-validator';

export class CreateUserRequestDto {
    @IsEmail()
    email: string;
}