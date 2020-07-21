// Core
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { ProjectModule } from '../Project/project.module';
import { RequisiteModule } from '../Requisite/requisite.module';

// Instruments
import { Scene } from './scene.entity';
import { SceneResolver } from './scene.resolver';
import { SceneService } from './scene.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ Scene ]),
        forwardRef(() => ProjectModule),
        forwardRef(() => RequisiteModule),
    ],
    providers: [ SceneResolver, SceneService ],
    exports:   [ SceneService ],
})
export class SceneModule {}
