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
        private readonly reqTypeService: ReqTypeService,
        @Inject(ProjectService)
        private readonly projectService: ProjectService,
    ) {}

    // ================================================================================================================

    @Query(() => [ ReqType ])
    reqTypes(
        @Args('projectId') projectId: string,
    ): Promise<ReqType[]> {
        return this.reqTypeService.findProjectReqTypes(projectId);
    }

    // ================================================================================================================

    @Mutation(() => ReqType)
    createReqType(
        @Args('input') input: ReqTypeCreateInput,
        @Args('projectId') projectId: string,  // eslint-disable-line @typescript-eslint/indent
    ): Promise<ReqType> {
        return this.reqTypeService.createOne(input, projectId);
    }

    // ================================================================================================================

    @Mutation(() => ReqType)
    async updateReqType(
        @Args('input') input: ReqTypeUpdateInput,
        @Args('reqTypeId') reqTypeId: string,  // eslint-disable-line @typescript-eslint/indent
    ): Promise<ReqType> {
        const reqType = await this.reqTypeService.findOneById(reqTypeId);

        return this.reqTypeService.updateOne(reqType, input);
    }

    // ================================================================================================================

    @Mutation(() => Boolean)
    async deleteReqType(
        @Args('reqTypeId') reqTypeId: string,
    ): Promise<Boolean> {
        return await this.reqTypeService.deleteOne(reqTypeId);
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
        return this.reqTypeService.findReqTypeRequisites(id);
    }
}
