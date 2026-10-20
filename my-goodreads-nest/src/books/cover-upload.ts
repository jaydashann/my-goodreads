import { diskStorage } from 'multer';
import { extname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { BadRequestException } from '@nestjs/common';
import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface.js';

export const COVERS_DIR = './uploads/covers';

export const coverUploadOptions: MulterOptions = {
    storage: diskStorage({
        destination: COVERS_DIR,
        filename: (_req, file, cb) => cb(null, `${randomUUID()}${extname(file.originalname)}`),
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (!/^image\/(jpeg|png|webp)$/.test(file.mimetype)) {
            return cb(new BadRequestException('Image must be JPEg, PNG, or WebP.'), false);
        }
        cb(null, true)
    },
};