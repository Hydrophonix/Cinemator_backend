// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { AuthModule } from '../Auth/auth.module';
import { UserModule } from '../User/user.module';

// Instruments
import { Project } from './project.entity';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ Project ]),
        AuthModule,
        UserModule,
    ],
    providers: [ ProjectResolver, ProjectService ],
    exports:   [ ProjectService ],
})
export class ProjectModule {}
