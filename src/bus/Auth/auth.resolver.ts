// Core
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { BadRequestException, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import bcrypt from 'bcryptjs';

// Instruments
import authConfig from './auth.config';
import { IContext } from '../../graphql/graphql.interfaces';
import { UserService } from '../User/user.service';
import { AuthService } from './auth.service';
import { AuthResponseWeb, AuthInput } from './auth.inputs';

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,

        @Inject(authConfig.KEY)
        private readonly config: ConfigType<typeof authConfig>,

        @Inject(UserService)
        private readonly userService: UserService,
    ) {}

    @Mutation(() => AuthResponseWeb)
    public async loginWeb(
        @Args('input') { email, password }: AuthInput,
        // eslint-disable-next-line @typescript-eslint/indent
        @Context() { res }: IContext,
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

        this.authService.setRefreshTokenToCookies(user, res);

        return {
            user,
            accessToken,
        };
    }

    @Mutation(() => AuthResponseWeb)
    public async registerWeb(
        @Args('input') { email, password }: AuthInput,
        // eslint-disable-next-line @typescript-eslint/indent
        @Context() { res }: IContext,
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

        this.authService.setRefreshTokenToCookies(user, res);

        return {
            user,
            accessToken,
        };
    }
}
