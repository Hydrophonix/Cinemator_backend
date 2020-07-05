// Core
import { Resolver, Query, Args, Mutation, Parent, ResolveField } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import _ from 'lodash';

// Entities
import { Workday } from './workday.entity';
import { Project } from '../Project/project.entity';
import { Scene } from '../Scene/scene.entity';

// Services
import { WorkdayService } from './workday.service';
import { ProjectService } from '../Project/project.service';
import { SceneService } from '../Scene/scene.service';

// Instruments
import { WorkdayCreateInput, WorkdayUpdateInput, WorkdayUpdateScenesResponse } from './workday.inputs';

@Resolver(() => Workday)
export class WorkdayResolver {
    constructor(
        @Inject(SceneService)
        private readonly sceneService: SceneService,
        @Inject(ProjectService)
        private readonly projectService: ProjectService,
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
        @Args('workdayId') workdayId: string,
    ): Promise<Workday> {
        return this.workdayService.findOne(workdayId);
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
        @Args('workdayId') workdayId: string,  // eslint-disable-line @typescript-eslint/indent
    ): Promise<Workday> {
        const workday = await this.workdayService.findOne(workdayId);

        return this.workdayService.updateOne(workday, input);
    }

    // ================================================================================================================

    @Mutation(() => Boolean)
    async deleteWorkday(
        @Args('workdayId') workdayId: string,
    ): Promise<Boolean> {
        return await this.workdayService.deleteOne(workdayId);
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    @Mutation(() => WorkdayUpdateScenesResponse)
    async updateWorkdayScenes(
        @Args('workdayId') workdayId: string,
        @Args('sceneIds', { type: () => [ String ] }) sceneIds: string[],  // eslint-disable-line @typescript-eslint/indent
    ): Promise<WorkdayUpdateScenesResponse> {
        const currentScenes = await this.workdayService.findWorkdayScenes(workdayId);
        const currentSceneIds = currentScenes.map(({ id }) => id);
        const intersection = _.intersection(sceneIds, currentSceneIds);
        const addSceneIds = _.difference(sceneIds, intersection);
        const removeSceneIds = _.difference(currentSceneIds, intersection);

        await this.workdayService.updateScenesRelation(workdayId, addSceneIds, removeSceneIds);

        const updatedWorkday = await this.workdayService.findOne(workdayId);
        const updatedScenes = await this.sceneService.findManyByIds([ ...addSceneIds, ...removeSceneIds ]);

        return {
            updatedWorkday,
            updatedScenes,
        };
    }

    // ================================================================================================================

    @Mutation(() => Workday)
    async addScenesToWorkday(
        @Args('workdayId') workdayId: string,
        @Args('sceneIds', { type: () => [ String ] }) sceneIds: string[],  // eslint-disable-line @typescript-eslint/indent
    ): Promise<Workday> {
        const IsSuccessfuly = await this.workdayService.addScenes(workdayId, sceneIds);

        if (!IsSuccessfuly) {
            throw new Error(`Add scenes to workday: ${workdayId} failed.`);
        }

        return this.workdayService.findOne(workdayId);
    }

    // ================================================================================================================

    @Mutation(() => Boolean)
    removeScenesFromWorkday(
        @Args('workdayId') workdayId: string,
        @Args('sceneIds', { type: () => [ String ] }) sceneIds: string[],  // eslint-disable-line @typescript-eslint/indent
    ): Promise<boolean> {
        return this.workdayService.removeScenes(workdayId, sceneIds);
    }

    // ================================================================================================================

    @ResolveField()
    project(
        @Parent() { projectId }: Workday,
    ): Promise<Project> {
        return this.projectService.findOne(projectId);
    }

    // ================================================================================================================

    @ResolveField(() => [ Scene ])
    scenes(
        @Parent() { id }: Workday,
    ): Promise<Scene[]> {
        return this.workdayService.findWorkdayScenes(id);
    }
}
