import { Module } from '@nestjs/common';
import { SceneResolver } from './scene.resolver';
import { SceneService } from './scene.service';

@Module({
    providers: [ SceneResolver, SceneService ],
})
export class SceneModule {}
