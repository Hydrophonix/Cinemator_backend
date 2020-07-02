// Core
import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

// Entities
import { Workday } from './workday.entity';
import { Scene } from '../Scene/scene.entity';

// Services
import { WorkdayService } from './workday.service';
import { ProjectService } from '../Project/project.service';
import { SceneService } from '../Scene/scene.service';

// Instruments
import { WorkdayCreateInput, WorkdayUpdateInput } from './workday.inputs';

@Resolver(() => Workday)
export class WorkdayResolver {
    constructor(
        @Inject(ProjectService)
        private readonly projectService: ProjectService,
        @Inject(SceneService)
        private readonly sceneService: SceneService,
        private readonly workdayService: WorkdayService,
    ) {}

    // ================================================================================================================

    @Query(() => [ Workday ])
    workdays(
        @Args('projectId') projectId: string,
    ): Promise<Workday[]> {
        return this.workdayService.findProjectWorkdays(projectId);
    }
    // ================================================================================================================

    @Query(() => Workday)
    workday(
        @Args('id') id: string,
    ): Promise<Workday> {
        return this.workdayService.findOne(id);
    }

    // ================================================================================================================

    @Mutation(() => Workday)
    async createWorkday(
        @Args('input') input: WorkdayCreateInput,
        @Args('projectId') projectId: string,  // eslint-disable-line @typescript-eslint/indent
    ): Promise<Workday> {
        const project = await this.projectService.findOne(projectId);

        return this.workdayService.createOne(input, project);
    }

    // ================================================================================================================

    @Mutation(() => Workday)
    async updateWorkday(
        @Args('input') input: WorkdayUpdateInput,
        @Args('id') id: string,  // eslint-disable-line @typescript-eslint/indent
    ): Promise<Workday> {
        const workday = await this.workdayService.findOne(id);

        return this.workdayService.updateOne(workday, input);
    }

    // ================================================================================================================

    @Mutation(() => Workday)
    async addSceneToWorkday(
        @Args('workdayId') workdayId: string,
        @Args('sceneId') sceneId: string,  // eslint-disable-line @typescript-eslint/indent
    ): Promise<Workday> {
        return this.workdayService.addScene(workdayId, sceneId);
    }

    // ================================================================================================================

    @Mutation(() => Workday)
    async removeSceneFromWorkday(
        @Args('workdayId') workdayId: string,
        @Args('sceneId') sceneId: string,  // eslint-disable-line @typescript-eslint/indent
    ): Promise<Workday> {
        const workday = await this.workdayService.findOne(workdayId);
        const scene = await this.sceneService.findOne(sceneId);

        return this.workdayService.removeScene(workday, scene);
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    @ResolveField()
    scenes(
        @Parent() { id }: Workday,
    ): Promise<Scene[]> {
        return this.sceneService.findProjectScenes(id);
    }
}
