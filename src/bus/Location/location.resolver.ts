// Core
import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

// Entities
import { Location } from './location.entity';
import { Project } from '../Project/project.entity';

// Services
import { LocationService } from './location.service';
import { ProjectService } from '../Project/project.service';

// Instruments
import { LocationCreateInput, LocationUpdateInput } from './location.inputs';

@Resolver(() => Location)
export class LocationResolver {
    constructor (
        private readonly locationService: LocationService,
        @Inject(ProjectService)
        private readonly projectService: ProjectService,
    ) {}

    // ================================================================================================================

    @Query(() => [ Location ])
    locations(
        @Args('projectId') projectId: string,
    ): Promise<Location[]> {
        return this.locationService.findProjectLocations(projectId);
    }

    // ================================================================================================================

    @Mutation(() => Location)
    createLocation(
        @Args('input') input: LocationCreateInput,
        @Args('projectId') projectId: string,  // eslint-disable-line @typescript-eslint/indent
    ): Promise<Location> {
        return this.locationService.createOne(input, projectId);
    }

    // ================================================================================================================

    @Mutation(() => Location)
    async updateLocation(
        @Args('input') input: LocationUpdateInput,
        @Args('locationId') locationId: string,  // eslint-disable-line @typescript-eslint/indent
    ): Promise<Location> {
        const location = await this.locationService.findOneById(locationId);

        return this.locationService.updateOne(location, input);
    }

    // ================================================================================================================

    @Mutation(() => Boolean)
    async deleteLocation(
        @Args('locationId') locationId: string,
    ): Promise<Boolean> {
        return await this.locationService.deleteOne(locationId);
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    @ResolveField()
    project(
        @Parent() { projectId }: Location,
    ): Promise<Project> {
        return this.projectService.findOne(projectId);
    }
}
