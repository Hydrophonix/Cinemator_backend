// Core
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { ProjectModule } from '../Project/project.module';

// Instruments
import { ReqType } from './reqType.entity';
import { ReqTypeService } from './reqType.service';
import { ReqTypeResolver } from './reqType.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([ ReqType ]),
        forwardRef(() => ProjectModule),
    ],
    providers: [ ReqTypeService, ReqTypeResolver ],
    exports:   [ ReqTypeService ],
})
export class ReqTypeModule {}
