// Core
import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { Response, Request } from 'express';

// Entities
import { User } from '../User/user.entity';

// Instruments
import authConfig from './auth.config';
import { IAccessTokenPayload, IRefreshTokenPayload } from './auth.interfaces';

@Injectable()
export class AuthService {
    constructor(
        @Inject(authConfig.KEY)
        private readonly config: ConfigType<typeof authConfig>,
    ) {}

    // ================================================================================================================

    readonly createAccessToken = (user: User) => {
        const payload: IAccessTokenPayload = {
            id: user.id,
        };

        return sign(
            payload,
            this.config.accessTokenSecret,
            { expiresIn: this.config.accessTokenDuration },
        );
    };

    // ================================================================================================================

    readonly createRefreshToken = (user: User) => {
        const payload: IRefreshTokenPayload = {
            id:           user.id,
            tokenVersion: user.tokenVersion,
        };

        return sign(
            payload,
            this.config.refreshTokenSecret,
            { expiresIn: this.config.refreshTokenDuration },
        );
    };

    // ================================================================================================================

    readonly setRefreshTokenToCookies = (refreshToken: string, res: Response) => {
        res.cookie(
            this.config.cookieName,
            refreshToken,
            {
                path:     '/auth/refresh_token',  // Should be equal to refreshToken() path
                maxAge:   this.config.cookieMaxAge,
                secure:   this.config.isProd,
                httpOnly: true,
                sameSite: 'lax',
            },
        );
    };

    // ================================================================================================================

    readonly getRefreshTokenFromCookies = (req: Request) => {
        const tokenKey = req.cookies[ this.config.cookieName ];

        return tokenKey;
    }

    // ================================================================================================================

    private readonly verifyToken = (tokenKey: string, secret: string) => {
        try {
            const token = verify(tokenKey, secret);

            if (typeof token !== 'object') {
                return null;
            }

            return token;
        } catch (error) {
            console.log(error.message);

            return null;
        }
    }

    // ================================================================================================================

    readonly verifyAccessToken = (headerTokenKey: string) => {
        const tokenKey = headerTokenKey.replace('Bearer ', '');

        return this.verifyToken(tokenKey, this.config.accessTokenSecret);
    }

    readonly verifyRefreshToken = (tokenKey: string) => {
        return this.verifyToken(tokenKey, this.config.refreshTokenSecret);
    }
}
