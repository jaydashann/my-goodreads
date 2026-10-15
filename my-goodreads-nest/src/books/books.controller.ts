import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    async getBooks() {
        return this.booksService.getBooks();
    } 

    @Post()
    async createBook(@Body() request: CreateBookDto) {
        return this.booksService.createBook(request)
    }
}
