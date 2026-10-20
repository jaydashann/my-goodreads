import { 
    Body, 
    Controller, 
    Get, 
    Post, 
    Delete, 
    Patch, 
    Param,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { BooksService } from './books.service.js';
import { ZodValidationPipe } from '../common/zod-validation.pipe.js';
import type { CreateBookDto } from './dto/create-book.dto.js';
import { bookSchema } from './dto/create-book.dto.js';
import type { UpdateBookDto } from './dto/update-book.dto.js';
import { UpdateBookSchema } from './dto/update-book.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { coverUploadOptions } from './cover-upload.js';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    async getBooks() {
        return this.booksService.getBooks();
    } 

    @Post()
    @UseInterceptors(FileInterceptor('book_cover', coverUploadOptions))
    async createBook(
        @Body(new ZodValidationPipe(bookSchema)) request: CreateBookDto,
        @UploadedFile() book_cover?: Express.Multer.File,
    ) {
        const tempUser = "d24003d1-6c03-449b-91d2-e95c62a479d8"
        return this.booksService.createBook(tempUser, request, book_cover?.filename)
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('book_cover', coverUploadOptions))
    async updateBook(
        @Param('id') id: string,
        @Body(new ZodValidationPipe(UpdateBookSchema)) request: UpdateBookDto,
        @UploadedFile() book_cover?: Express.Multer.File,
    ) {
        return this.booksService.updateBook(id, request, book_cover?.filename);
        //console.log(request);
    }

    @Delete(':id')
    async removeBook(@Param('id') id: string) {
        return this.booksService.removeBook(id);
    }
}
