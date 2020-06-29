// Core
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

// Entities
import { Requisite } from './requisite.entity';

// Services
import { RequisiteService } from './requisite.service';
import { ProjectService } from '../Project/project.service';
// import { SceneService } from '../Scene/scene.service';

// Instruments
import { RequisiteCreateInput } from './requisite.inputs';

@Resolver(() => Requisite)
export class RequisiteResolver {
    constructor(
        @Inject(ProjectService)
        private readonly projectService: ProjectService,
        // @Inject(SceneService)
        // private readonly sceneService: SceneService,
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

    @Mutation(() => Requisite)
    async createRequisite(
        @Args('input') input: RequisiteCreateInput,
        @Args('projectId') projectId: string, // eslint-disable-line @typescript-eslint/indent
    ): Promise<Requisite> {
        const project = await this.projectService.findOne(projectId);

        return this.requisiteService.createOne(input, project);
    }

    // ================================================================================================================

    @Mutation(() => String)
    async deleteRequisite(
        @Args('id') id: string,
    ): Promise<string> {
        await this.requisiteService.deleteOne(id);

        return id;
    }
}
