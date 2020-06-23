// Core
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IContext } from '../../graphql/graphql.interfaces';

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);

<<<<<<< HEAD
        return ctx.getContext().user;
=======
        return ctx.getContext<IContext>().user;
>>>>>>> 1c09fde1fff5512329f83ffd1e4b5f9997794253
    },
);
