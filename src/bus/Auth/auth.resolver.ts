// Core
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { BadRequestException, Inject, UseGuards } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import bcrypt from 'bcryptjs';

// Entities

// Services
import { AuthService } from './auth.service';
import { UserService } from '../User/user.service';

// Instruments
import authConfig from './auth.config';
import { AuthResponseWeb, AuthInput } from './auth.inputs';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from './auth.decorators';
import { IContext, IContextUser } from '../../graphql/graphql.interfaces';

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        @Inject(authConfig.KEY)
        private readonly config: ConfigType<typeof authConfig>,
        @Inject(UserService)
        private readonly userService: UserService,
    ) {}

    // ================================================================================================================

    @Mutation(() => AuthResponseWeb)
    async loginWeb(
        @Args('input') { email, password }: AuthInput,
        @Context() { res }: IContext, // eslint-disable-line @typescript-eslint/indent
    ): Promise<AuthResponseWeb> {
        const user = await this.userService.findOneByEmail(email);

        if (!user) {
            throw new BadRequestException('Email-password combination you have entered is not valid');
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new BadRequestException('Email-password combination you have entered is not valid');
        }

        const accessToken = this.authService.createAccessToken(user);
        const refreshToken = this.authService.createRefreshToken(user);

        this.authService.setRefreshTokenToCookies(refreshToken, res);

        return {
            user,
            accessToken,
        };
    }

    // ================================================================================================================

    @Mutation(() => AuthResponseWeb)
    async registerWeb(
        @Args('input') { email, password }: AuthInput,
        @Context() { res }: IContext, // eslint-disable-line @typescript-eslint/indent
    ): Promise<AuthResponseWeb> {
        const existingUser = await this.userService.findOneByEmail(email);

        if (existingUser) {
            throw new BadRequestException('User with email you have entered is already exist');
        }

        const hashedPassword = await bcrypt.hash(password, this.config.saltRounds);
        const user = await this.userService.createOne({
            email,
            password: hashedPassword,
        });
        const accessToken = this.authService.createAccessToken(user);
        const refreshToken = this.authService.createRefreshToken(user);

        this.authService.setRefreshTokenToCookies(refreshToken, res);

        return {
            user,
            accessToken,
        };
    }

    // ================================================================================================================

    @Mutation(() => Boolean)
    @UseGuards(AuthGuard)
    logoutWeb(
        @Context() { res }: IContext,
    ): boolean {
        this.authService.setRefreshTokenToCookies('', res);

        return true;
    }

    // ================================================================================================================

    @Mutation(() => Boolean)
    @UseGuards(AuthGuard)
    async forceLogoutWeb(
        @CurrentUser() { id }: IContextUser,
        @Context() { res }: IContext, // eslint-disable-line @typescript-eslint/indent
    ): Promise<boolean> {
        await this.userService.updateTokenVersion(id);
        this.authService.setRefreshTokenToCookies('', res);

        return true;
    }
}
