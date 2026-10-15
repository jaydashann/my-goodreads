import { IsString, IsNumber, IsOptional, IsEnum, IsDateString, IsIn, Min, Max } from 'class-validator';
import { BOOK_STATUS } from '../schema.js';

export class CreateBookDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsString()
    decription?: string;

    @IsOptional()
    @IsIn(BOOK_STATUS)
    status?: (typeof BOOK_STATUS)[number];
    
    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsDateString()
    started_at?: string;

    @IsOptional()
    @IsDateString()
    completed_at?: string;
}