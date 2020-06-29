// Core
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IContext } from '../../graphql/graphql.interfaces';

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);

        return ctx.getContext<IContext>().user;
    },
);
