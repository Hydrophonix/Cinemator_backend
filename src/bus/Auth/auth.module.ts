// Core
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Modules
import { UserModule } from '../User/user.module';

// Instruments
import authConfig from './auth.config';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        ConfigModule.forFeature(authConfig),
        forwardRef(() => UserModule),
    ],
    controllers: [ AuthController ],
    providers:   [ AuthResolver, AuthService ],
    exports:     [ AuthService ],
})
export class AuthModule {}
