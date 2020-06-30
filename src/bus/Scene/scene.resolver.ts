// Core
import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

// Entities
import { Scene } from './scene.entity';
import { Requisite } from '../Requisite/requisite.entity';
import { Workday } from '../Workday/workday.entity';

// Services
import { SceneService } from './scene.service';
import { ProjectService } from '../Project/project.service';
import { WorkdayService } from '../Workday/workday.service';
import { RequisiteService } from '../Requisite/requisite.service';

// Instruments
import { SceneCreateInput } from './scene.inputs';

@Resolver(() => Scene)
export class SceneResolver {
    constructor(
        @Inject(ProjectService)
        private readonly projectService: ProjectService,
        @Inject(WorkdayService)
        private readonly workdayService: WorkdayService,
        @Inject(RequisiteService)
        private readonly requisiteService: RequisiteService,
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

    @Query(() => Scene)
    scene(
        @Args('id') id: string,
    ): Promise<Scene> {
        return this.sceneService.findOne(id);
    }

    // ================================================================================================================

    @Mutation(() => Scene)
    async createScene(
        @Args('projectId') projectId: string,
        @Args('workdayId', { nullable: true }) workdayId: string, // eslint-disable-line @typescript-eslint/indent
        @Args('input') input: SceneCreateInput, // eslint-disable-line @typescript-eslint/indent
    ): Promise<Scene> {
        const project = await this.projectService.findOne(projectId);

        if (workdayId) {
            const workday = await this.workdayService.findOne(workdayId);

            return this.sceneService.createOne(input, project, workday);
        }

        return this.sceneService.createOne(input, project);
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

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    @ResolveField()
    requisites(
        @Parent() { id }: Scene,
    ): Promise<Requisite[]> {
        return this.requisiteService.findScenesRequisites(id);
    }

    // ================================================================================================================

    @ResolveField()
    workdays(
        @Parent() { id }: Scene,
    ): Promise<Workday[]> {
        return this.workdayService.findSceneWorkdays(id);
    }
}
