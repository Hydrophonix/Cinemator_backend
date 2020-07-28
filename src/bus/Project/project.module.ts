// Core
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { AuthModule } from '../Auth/auth.module';
import { UserModule } from '../User/user.module';
import { WorkdayModule } from '../Workday/workday.module';
import { LocationModule } from '../Location/location.module';
import { SceneModule } from '../Scene/scene.module';
import { RequisiteModule } from '../Requisite/requisite.module';
import { ReqTypeModule } from '../ReqType/reqType.module';

// Instruments
import { Project } from './project.entity';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ Project ]),
        forwardRef(() => AuthModule),
        forwardRef(() => UserModule),
        forwardRef(() => WorkdayModule),
        forwardRef(() => LocationModule),
        forwardRef(() => SceneModule),
        forwardRef(() => RequisiteModule),
        forwardRef(() => ReqTypeModule),
    ],
    providers: [ ProjectResolver, ProjectService ],
    exports:   [ ProjectService ],
})
export class ProjectModule {}
