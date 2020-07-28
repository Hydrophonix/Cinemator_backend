// Core
import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

// Entities
import { ReqType } from './reqType.entity';
import { Project } from '../Project/project.entity';

// Services
import { ReqTypeService } from './reqType.service';
import { ProjectService } from '../Project/project.service';

// Instruments
import { ReqTypeCreateInput, ReqTypeUpdateInput } from './reqType.inputs';
import { Requisite } from '../Requisite/requisite.entity';

@Resolver(() => ReqType)
export class ReqTypeResolver {
    constructor (
        private readonly typeService: ReqTypeService,
        @Inject(ProjectService)
        private readonly projectService: ProjectService,
    ) {}

    // ================================================================================================================

    @Query(() => [ ReqType ])
    types(
        @Args('projectId') projectId: string,
    ): Promise<ReqType[]> {
        return this.typeService.findProjectReqTypes(projectId);
    }

    // ================================================================================================================

    @Mutation(() => ReqType)
    createReqType(
        @Args('input') input: ReqTypeCreateInput,
        @Args('projectId') projectId: string,  // eslint-disable-line @typescript-eslint/indent
    ): Promise<ReqType> {
        return this.typeService.createOne(input, projectId);
    }

    // ================================================================================================================

    @Mutation(() => ReqType)
    async updateReqType(
        @Args('input') input: ReqTypeUpdateInput,
        @Args('typeId') typeId: string,  // eslint-disable-line @typescript-eslint/indent
    ): Promise<ReqType> {
        const type = await this.typeService.findOneById(typeId);

        return this.typeService.updateOne(type, input);
    }

    // ================================================================================================================

    @Mutation(() => Boolean)
    async deleteReqType(
        @Args('typeId') typeId: string,
    ): Promise<Boolean> {
        return await this.typeService.deleteOne(typeId);
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    @ResolveField()
    project(
        @Parent() { projectId }: ReqType,
    ): Promise<Project> {
        return this.projectService.findOne(projectId);
    }

    // ================================================================================================================

    @ResolveField(() => [ Requisite ])
    requisites(
        @Parent() { id }: ReqType,
    ): Promise<Requisite[]> {
        return this.typeService.findReqTypeRequisites(id);
    }
}
