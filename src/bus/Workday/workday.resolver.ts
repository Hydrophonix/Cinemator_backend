// Core
import { Resolver, Query, Args, Mutation, Parent, ResolveField } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

// Entities
import { Workday } from './workday.entity';
import { Project } from '../Project/project.entity';
import { Scene } from '../Scene/scene.entity';

// Services
import { WorkdayService } from './workday.service';
import { ProjectService } from '../Project/project.service';

// Instruments
import { WorkdayCreateInput, WorkdayUpdateInput } from './workday.inputs';

@Resolver(() => Workday)
export class WorkdayResolver {
    constructor(
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
    async deleteWorkday(
        @Args('id') id: string,
    ): Promise<Workday> {
        const workday = await this.workdayService.findOne(id);
        await this.workdayService.deleteOne(id);

        return workday;
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    @Mutation(() => Boolean)
    addScenesToWorkday(
        @Args('workdayId') workdayId: string,
        @Args('sceneIds', { type: () => [ String ] }) sceneIds: string[],  // eslint-disable-line @typescript-eslint/indent
    ): Promise<boolean> {
        return this.workdayService.addScenes(workdayId, sceneIds);
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
