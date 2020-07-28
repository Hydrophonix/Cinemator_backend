import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { ProjectModule } from '../Project/project.module';
import { SceneModule } from '../Scene/scene.module';
import { ReqTypeModule } from '../ReqType/reqType.module';

// Instruments
import { Requisite } from './requisite.entity';
import { RequisiteResolver } from './requisite.resolver';
import { RequisiteService } from './requisite.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ Requisite ]),
        forwardRef(() => ProjectModule),
        forwardRef(() => SceneModule),
        forwardRef(() => ReqTypeModule),

    ],
    providers: [ RequisiteResolver, RequisiteService ],
    exports:   [ RequisiteService ],
})
export class RequisiteModule {}
