// Core
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        console.log('"|_(ʘ_ʘ)_/" =>: data', data);
        const ctx = GqlExecutionContext.create(context);

        return ctx.getContext().user;
    },
);
