// Core
import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

// Entities
import { Requisite } from './requisite.entity';
import { Project } from '../Project/project.entity';
import { Scene } from '../Scene/scene.entity';

// Services
import { RequisiteService } from './requisite.service';
import { ProjectService } from '../Project/project.service';

// Instruments
import { RequisiteCreateInput } from './requisite.inputs';

@Resolver(() => Requisite)
export class RequisiteResolver {
    constructor(
        @Inject(ProjectService)
        private readonly projectService: ProjectService,
        private readonly requisiteService: RequisiteService,
    ) {}

    // ================================================================================================================

    @Query(() => [ Requisite ])
    requisites(
        @Args('projectId') projectId: string,
    ): Promise<Requisite[]> {
        return this.requisiteService.findProjectRequisites(projectId);
    }

    // ================================================================================================================

    @Query(() => Requisite)
    requisite(
        @Args('id') id: string,
    ): Promise<Requisite> {
        return this.requisiteService.findOne(id);
    }

    // ================================================================================================================

    @Mutation(() => Requisite)
    async createRequisite(
        @Args('input') input: RequisiteCreateInput,
        @Args('projectId') projectId: string, // eslint-disable-line @typescript-eslint/indent
    ): Promise<Requisite> {
        const project = await this.projectService.findOne(projectId);

        return this.requisiteService.createOne(input, project);
    }

    // ================================================================================================================

    @Mutation(() => Boolean)
    async deleteRequisite(
        @Args('id') id: string,
    ): Promise<Boolean> {
        return await this.requisiteService.deleteOne(id);
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    @ResolveField()
    project(
        @Parent() { projectId }: Requisite,
    ): Promise<Project> {
        return this.projectService.findOne(projectId);
    }

    // ================================================================================================================

    @ResolveField()
    scenes(
        @Parent() { id }: Requisite,
    ): Promise<Scene[]> {
        return this.requisiteService.findRequisiteScenes(id);
    }
}
