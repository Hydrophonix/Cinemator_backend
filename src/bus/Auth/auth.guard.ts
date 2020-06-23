// Core
import { Injectable, CanActivate, Inject, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// Instruments
import { IContext, IContextUser } from '../../graphql/graphql.interfaces';
import { AuthService } from './auth.service';
import { IAccessTokenPayload } from './auth.interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
    static isAccessToken(token: object): token is IAccessTokenPayload {
        return (
            // eslint-disable-next-line no-extra-parens
            typeof (token as IAccessTokenPayload).id === 'string'
        );
    }

    constructor(
        @Inject(AuthService)
        private readonly authService: AuthService,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean {
        const ctx = GqlExecutionContext.create(context).getContext<IContext>();
        const headerTokenKey = ctx.req.headers.authorization;

        if (!headerTokenKey) {
            throw new UnauthorizedException('not authenticated');
        }

        const token = this.authService.verifyAccessToken(headerTokenKey);

        if (!token) {
            throw new UnauthorizedException('not authenticated');
        }

        if (AuthGuard.isAccessToken(token)) {
            const user: IContextUser = { id: token.id };

            ctx.user = user;

            return true;
        }

        throw new UnauthorizedException('not authenticated');
    }
}
