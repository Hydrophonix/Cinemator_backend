// Core
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Instruments
import authConfig from './auth.config';
import { UserModule } from '../User/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports:     [ UserModule, ConfigModule.forFeature(authConfig) ],
    controllers: [ AuthController ],
    providers:   [ AuthResolver, AuthService ],
    exports:     [ AuthService ],
})
export class AuthModule {}