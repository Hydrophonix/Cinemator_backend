// Core
import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
    isProd:               process.env.NODE_ENV === 'production',
    accessTokenSecret:    process.env.ACCESS_TOKEN_SECRET || 'superSecretOne',
    refreshTokenSecret:   process.env.REFRESH_TOKEN_SECRET || 'superSecretTwo',
    accessTokenDuration:  '15m',
    refreshTokenDuration: '14d',
    cookieMaxAge:         1000 * 60 * 60 * 24 * 14, // Should be equal to REFRESH_TOKEN_DURATION
    cookieName:           `${process.env.APP_NAME || 'AwesomeApp'}_jid`,
    saltRounds:           12,
}));
