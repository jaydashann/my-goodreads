import z from 'zod';
import { GetSystemModulesDtoSchema } from './system-module.dto.js';

export type GetSystemModulesDto = z.infer<typeof GetSystemModulesDtoSchema>;
