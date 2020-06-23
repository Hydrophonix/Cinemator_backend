// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { ProjectModule } from '../Project/project.module';
import { WorkdayModule } from '../Workday/workday.module';

// Instruments
import { Scene } from './scene.entity';
import { SceneResolver } from './scene.resolver';
import { SceneService } from './scene.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ Scene ]),
        ProjectModule,
        WorkdayModule,
    ],
    providers: [ SceneResolver, SceneService ],
})
export class SceneModule {}
