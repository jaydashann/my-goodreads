import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/guard/jwt.guard.js';
import { ZodValidationPipe } from '../common/zod-validation.pipe.js';
import { BooksService } from './books.service.js';
import { coverUploadOptions } from './cover-upload.js';
import type { CreateBookDto } from './dto/create-book.dto.js';
import { bookSchema } from './dto/create-book.dto.js';
import type { UpdateBookDto } from './dto/update-book.dto.js';
import { UpdateBookSchema } from './dto/update-book.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks(@CurrentUser('id') userId: string) {
    return this.booksService.getBooks(userId);
  }

  @Get(':id')
  async getBookById(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.booksService.getBookById(userId, id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('book_cover', coverUploadOptions))
  async createBook(
    @CurrentUser('id') userId: string,
    @Body(new ZodValidationPipe(bookSchema)) request: CreateBookDto,
    @UploadedFile() book_cover?: Express.Multer.File,
  ) {
    return this.booksService.createBook(userId, request, book_cover?.filename);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('book_cover', coverUploadOptions))
  async updateBook(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateBookSchema)) request: UpdateBookDto,
    @UploadedFile() book_cover?: Express.Multer.File,
  ) {
    return this.booksService.updateBook(
      userId,
      id,
      request,
      book_cover?.filename,
    );
    //console.log(request);
  }

  @Delete(':id')
  async removeBook(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.booksService.removeBook(id, userId);
  }
}
