// Core
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { AuthModule } from '../Auth/auth.module';

// Instruments
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ User ]),
        forwardRef(() => AuthModule),
    ],
    providers: [ UserService, UserResolver ],
    exports:   [ UserService ],
})
export class UserModule {}
