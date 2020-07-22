// Core
import { Controller, Post, Req, Res, Inject, HttpCode, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

// Instruments
import { AuthService } from './auth.service';
import { UserService } from '../User/user.service';
import { IRefreshTokenResponse } from './auth.interfaces';

@Controller('auth')
export class AuthController {
    private readonly NO_TOKEN: IRefreshTokenResponse = {
        success:     false,
        accessToken: '',
    }

    constructor(
        private readonly authService: AuthService,

        @Inject(UserService)
        private readonly userService: UserService,
    ) {}

    @Post('/refresh_token')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Req() req: Request, @Res() res: Response) {
        const tokenKey = this.authService.getRefreshTokenFromCookies(req);

        if (!tokenKey) {
            return res.send(this.NO_TOKEN);
        }

        // TODO: add types
        const token: any = this.authService.verifyRefreshToken(tokenKey);

        if (!token) {
            return res.send(this.NO_TOKEN);
        }

        // token is valid and
        // we can send back an access token

        const user = await this.userService.findOneById(token.id);

        if (!user || user.tokenVersion !== token.tokenVersion) {
            return res.send(this.NO_TOKEN);
        }

        const accessToken = this.authService.createAccessToken(user);
        const refreshToken = this.authService.createRefreshToken(user);
        const refreshTokenResponse: IRefreshTokenResponse = {
            success: true,
            accessToken,
        };

        this.authService.setRefreshTokenToCookies(refreshToken, res);

        return res.send(refreshTokenResponse);
    }
}
