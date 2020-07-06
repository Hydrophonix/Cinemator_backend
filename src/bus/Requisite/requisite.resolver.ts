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
import { RequisiteCreateInput, RequisiteUpdateInput } from './requisite.inputs';

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
        @Args('requisiteId') requisiteId: string,
    ): Promise<Requisite> {
        return this.requisiteService.findOneById(requisiteId);
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

    @Mutation(() => Requisite)
    async updateRequisite(
        @Args('input') input: RequisiteUpdateInput,
        @Args('requisiteId') requisiteId: string,  // eslint-disable-line @typescript-eslint/indent
    ): Promise<Requisite> {
        const requisite = await this.requisiteService.findOneById(requisiteId);

        return this.requisiteService.updateOne(requisite, input);
    }

    // ================================================================================================================

    @Mutation(() => Boolean)
    async deleteRequisite(
        @Args('requisiteId') requisiteId: string,
    ): Promise<Boolean> {
        return await this.requisiteService.deleteOne(requisiteId);
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
