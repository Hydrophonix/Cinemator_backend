// Core
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

// Entities
import { Scene } from './scene.entity';

// Services
import { SceneService } from './scene.service';
import { ProjectService } from '../Project/project.service';
import { WorkdayService } from '../Workday/workday.service';

// Instruments
import { SceneCreateInput } from './scene.inputs';

@Resolver(() => Scene)
export class SceneResolver {
    constructor(
        @Inject(ProjectService)
        private readonly projectService: ProjectService,
        @Inject(WorkdayService)
        private readonly workdayService: WorkdayService,
        private readonly sceneService: SceneService,
    ) {}

    // ================================================================================================================

    @Query(() => [ Scene ])
    scenes(
        @Args('projectId') projectId: string,
    ): Promise<Scene[]> {
        return this.sceneService.findProjectScenes(projectId);
    }

    // ================================================================================================================

    @Mutation(() => Scene)
    async createScene(
        @Args('projectId') projectId: string,
        @Args('workdayId') workdayId: string, // eslint-disable-line @typescript-eslint/indent
        @Args('input') input: SceneCreateInput, // eslint-disable-line @typescript-eslint/indent
    ): Promise<Scene> {
        const project = await this.projectService.findOne(projectId);
        const workday = await this.workdayService.findOne(workdayId);

        return this.sceneService.createOne(input, project, workday);
    }

    // ================================================================================================================

    @Mutation(() => Scene)
    async deleteScene(
        @Args('id') id: string,
    ): Promise<Scene> {
        const scene = await this.sceneService.findOne(id);
        await this.sceneService.deleteOne(id);

        return scene;
    }
}
