// Core
import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import _ from 'lodash';

// Entities
import { Requisite } from './requisite.entity';
import { Project } from '../Project/project.entity';
import { Scene } from '../Scene/scene.entity';
import { ReqType } from '../ReqType/reqType.entity';

// Services
import { RequisiteService } from './requisite.service';
import { ProjectService } from '../Project/project.service';
import { SceneService } from '../Scene/scene.service';
import { ReqTypeService } from '../ReqType/reqType.service';

// Instruments
import { RequisiteCreateInput, RequisiteUpdateInput, RequisiteUpdateScenesResponse, RequisiteUpdateReqTypesResponse } from './requisite.inputs';

@Resolver(() => Requisite)
export class RequisiteResolver {
    constructor(
        private readonly requisiteService: RequisiteService,
        @Inject(ProjectService)
        private readonly projectService: ProjectService,
        @Inject(SceneService)
        private readonly sceneService: SceneService,
        @Inject(ReqTypeService)
        private readonly reqTypeService: ReqTypeService,
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

    @Mutation(() => RequisiteUpdateScenesResponse)
    async updateRequisiteScenes(
        @Args('requisiteId') requisiteId: string,
        @Args('sceneIds', { type: () => [ String ] }) sceneIds: string[],  // eslint-disable-line @typescript-eslint/indent
    ): Promise<RequisiteUpdateScenesResponse> {
        const currentScenes = await this.requisiteService.findRequisiteScenes(requisiteId);
        const currentSceneIds = currentScenes.map(({ id }) => id);
        const intersection = _.intersection(sceneIds, currentSceneIds);
        const addSceneIds = _.difference(sceneIds, intersection);
        const removeSceneIds = _.difference(currentSceneIds, intersection);

        await this.requisiteService.updateScenesRelation(requisiteId, addSceneIds, removeSceneIds);

        const updatedRequisite = await this.requisiteService.findOneById(requisiteId);
        const updatedScenes = await this.sceneService.findManyByIds([ ...addSceneIds, ...removeSceneIds ]);

        return {
            updatedRequisite,
            updatedScenes,
        };
    }

    // ================================================================================================================

    @Mutation(() => RequisiteUpdateReqTypesResponse)
    async updateRequisiteReqTypes(
        @Args('requisiteId') requisiteId: string,
        @Args('reqTypeIds', { type: () => [ String ] }) reqTypeIds: string[],  // eslint-disable-line @typescript-eslint/indent
    ): Promise<RequisiteUpdateReqTypesResponse> {
        const currentReqTypes = await this.requisiteService.findRequisiteReqTypes(requisiteId);
        const currentReqTypeIds = currentReqTypes.map(({ id }) => id);
        const intersection = _.intersection(reqTypeIds, currentReqTypeIds);
        const addReqTypeIds = _.difference(reqTypeIds, intersection);
        const removeReqTypeIds = _.difference(currentReqTypeIds, intersection);

        await this.requisiteService.updateReqTypesRelation(requisiteId, addReqTypeIds, removeReqTypeIds);

        const updatedRequisite = await this.requisiteService.findOneById(requisiteId);
        const updatedReqTypes = await this.reqTypeService.findManyByIds([ ...addReqTypeIds, ...removeReqTypeIds ]);

        return {
            updatedRequisite,
            updatedReqTypes,
        };
    }

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

    // ================================================================================================================

    @ResolveField()
    reqTypes(
        @Parent() { id }: Requisite,
    ): Promise<ReqType[]> {
        return this.requisiteService.findRequisiteReqTypes(id);
    }
}
