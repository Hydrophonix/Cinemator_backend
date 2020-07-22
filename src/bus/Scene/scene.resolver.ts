// Core
import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import _ from 'lodash';

// Entities
import { Scene } from './scene.entity';
import { Project } from '../Project/project.entity';
import { Workday } from '../Workday/workday.entity';
import { Location } from '../Location/location.entity';
import { Requisite } from '../Requisite/requisite.entity';

// Services
import { SceneService } from './scene.service';
import { ProjectService } from '../Project/project.service';
import { LocationService } from '../Location/location.service';
import { RequisiteService } from '../Requisite/requisite.service';

// Instruments
import { SceneCreateInput, SceneUpdateRequisitesResponse, SceneUpdateInput, SceneUpdateLocationsResponse } from './scene.inputs';

@Resolver(() => Scene)
export class SceneResolver {
    constructor(
        private readonly sceneService: SceneService,
        @Inject(ProjectService)
        private readonly projectService: ProjectService,
        @Inject(LocationService)
        private readonly locationService: LocationService,
        @Inject(RequisiteService)
        private readonly requisiteService: RequisiteService,
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
        @Args('sceneId') sceneId: string,
    ): Promise<Scene> {
        return this.sceneService.findOneById(sceneId);
    }

    // ================================================================================================================

    @Mutation(() => Scene)
    async createScene(
        @Args('projectId') projectId: string,
        @Args('input') input: SceneCreateInput, // eslint-disable-line @typescript-eslint/indent
    ): Promise<Scene> {
        const project = await this.projectService.findOne(projectId);

        return this.sceneService.createOne(input, project);
    }

    // ================================================================================================================

    @Mutation(() => Scene)
    async updateScene(
        @Args('input') input: SceneUpdateInput,
        @Args('sceneId') sceneId: string,  // eslint-disable-line @typescript-eslint/indent
    ): Promise<Scene> {
        const scene = await this.sceneService.findOneById(sceneId);

        return this.sceneService.updateOne(scene, input);
    }

    // ================================================================================================================

    @Mutation(() => Boolean)
    async deleteScene(
        @Args('sceneId') sceneId: string,
    ): Promise<boolean> {
        return await this.sceneService.deleteOne(sceneId);
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    @Mutation(() => SceneUpdateRequisitesResponse)
    async updateSceneRequisites(
        @Args('sceneId') sceneId: string,
        @Args('requisiteIds', { type: () => [ String ] }) requisiteIds: string[],  // eslint-disable-line @typescript-eslint/indent
    ): Promise<SceneUpdateRequisitesResponse> {
        const currentRequsites = await this.sceneService.findSceneRequisites(sceneId);
        const currentRequisiteIds = currentRequsites.map(({ id }) => id);
        const intersection = _.intersection(requisiteIds, currentRequisiteIds);
        const addRequisiteIds = _.difference(requisiteIds, intersection);
        const removeRequisiteIds = _.difference(currentRequisiteIds, intersection);

        await this.sceneService.updateRequisitesRelation(sceneId, addRequisiteIds, removeRequisiteIds);

        const updatedScene = await this.sceneService.findOneById(sceneId);
        const updatedRequisites = await this.requisiteService.findManyByIds(
            [ ...addRequisiteIds, ...removeRequisiteIds ],
        );

        return {
            updatedScene,
            updatedRequisites,
        };
    }

    // ================================================================================================================

    @Mutation(() => SceneUpdateLocationsResponse)
    async updateSceneLocations(
        @Args('sceneId') sceneId: string,
        @Args('locationIds', { type: () => [ String ] }) locationIds: string[],  // eslint-disable-line @typescript-eslint/indent
    ): Promise<SceneUpdateLocationsResponse> {
        const currentLocations = await this.sceneService.findSceneLocations(sceneId);
        const currentLocationIds = currentLocations.map(({ id }) => id);
        const intersection = _.intersection(locationIds, currentLocationIds);
        const addLocationIds = _.difference(locationIds, intersection);
        const removeLocationIds = _.difference(currentLocationIds, intersection);

        await this.sceneService.updateRequisitesRelation(sceneId, addLocationIds, removeLocationIds);

        const updatedScene = await this.sceneService.findOneById(sceneId);
        const updatedLocations = await this.locationService.findManyByIds(
            [ ...addLocationIds, ...removeLocationIds ],
        );

        return {
            updatedScene,
            updatedLocations,
        };
    }

    // ================================================================================================================

    @ResolveField()
    project(
        @Parent() { projectId }: Scene,
    ): Promise<Project> {
        return this.projectService.findOne(projectId);
    }

    // ================================================================================================================

    @ResolveField()
    requisites(
        @Parent() { id }: Scene,
    ): Promise<Requisite[]> {
        return this.sceneService.findSceneRequisites(id);
    }

    // ================================================================================================================

    @ResolveField()
    workdays(
        @Parent() { id }: Scene,
    ): Promise<Workday[]> {
        return this.sceneService.findSceneWorkdays(id);
    }

    // ================================================================================================================

    @ResolveField()
    locations(
        @Parent() { id }: Scene,
    ): Promise<Location[]> {
        return this.sceneService.findSceneLocations(id);
    }
}
