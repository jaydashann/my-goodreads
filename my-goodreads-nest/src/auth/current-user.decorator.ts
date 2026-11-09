import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getCurrentUserByContext = (context: ExecutionContext) =>
  context.switchToHttp().getRequest().user;

export const CurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const user = getCurrentUserByContext(context);
    return data ? user?.[data] : user;
  },
);
