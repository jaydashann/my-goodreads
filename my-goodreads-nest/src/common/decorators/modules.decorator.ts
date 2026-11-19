import { SetMetadata } from '@nestjs/common';
import { SystemModule } from '../../system-module/system-module.enum.js';

export const MODULES_KEY = 'modules';
export const Modules = (...modules: SystemModule[]) =>
  SetMetadata(MODULES_KEY, modules);
