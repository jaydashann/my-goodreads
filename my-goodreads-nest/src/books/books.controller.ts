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
import { BooksService } from './books.service.js';
import { ZodValidationPipe } from '../common/zod-validation.pipe.js';
import type { CreateBookDto } from './dto/create-book.dto.js';
import { bookSchema } from './dto/create-book.dto.js';
import type { UpdateBookDto } from './dto/update-book.dto.js';
import { UpdateBookSchema } from './dto/update-book.dto.js';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    async getBooks() {
        return this.booksService.getBooks();
    } 

    @Post()
    async createBook(@Body(new ZodValidationPipe(bookSchema)) request: CreateBookDto) {
        return this.booksService.createBook(request)
    }

    @Patch(':bookId')
    async updateBook(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ZodValidationPipe(UpdateBookSchema)) request: UpdateBookDto,
    ) {
        return this.booksService.updateBook(id, request);
    }

    @Delete(':bookId')
    async removeBook(@Param('id', ParseIntPipe) id: number) {
        return this.booksService.removeBook(id);
    }
}
