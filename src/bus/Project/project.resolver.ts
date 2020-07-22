// Core
import { Resolver, Args, Mutation, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';

// Entities
import { Project } from './project.entity';
import { User } from '../User/user.entity';
import { Workday } from '../Workday/workday.entity';
import { Location } from '../Location/location.entity';
import { Scene } from '../Scene/scene.entity';
import { Requisite } from '../Requisite/requisite.entity';

// Services
import { ProjectService } from './project.service';
import { UserService } from '../User/user.service';
import { WorkdayService } from '../Workday/workday.service';
import { SceneService } from '../Scene/scene.service';
import { LocationService } from '../Location/location.service';
import { RequisiteService } from '../Requisite/requisite.service';

// Instruments
import { IContextUser } from '../../graphql/graphql.interfaces';
import { AuthGuard } from '../Auth/auth.guard';
import { CurrentUser } from '../Auth/auth.decorators';
import { ProjectCreateInput, ProjectUpdateInput } from './project.inputs';


@Resolver(() => Project)
export class ProjectResolver {
    // eslint-disable-next-line max-params
    constructor(
        private readonly projectService: ProjectService,
        @Inject(UserService)
        private readonly userService: UserService,
        @Inject(WorkdayService)
        private readonly workdayService: WorkdayService,
        @Inject(SceneService)
        private readonly sceneService: SceneService,
        @Inject(LocationService)
        private readonly locationService: LocationService,
        @Inject(RequisiteService)
        private readonly requisiteService: RequisiteService,
    ) {}

    // ================================================================================================================

    @Mutation(() => Project, { description: 'Create new project' })
    @UseGuards(AuthGuard)
    async createProject(
        @Args('input') input: ProjectCreateInput,
        @CurrentUser() { id }: IContextUser, // eslint-disable-line @typescript-eslint/indent
    ): Promise<Project> {
        return await this.projectService.createOne(input, id);
    }

    // ================================================================================================================

    @Query(() => [ Project ])
    @UseGuards(AuthGuard)
    async ownedProjects(
        @CurrentUser() { id }: IContextUser,
    ): Promise<Project[]> {
        return await this.projectService.findOwnedProjects(id);
    }

    // ================================================================================================================

    @Mutation(() => Project)
    @UseGuards(AuthGuard)
    async updateProject(
        @Args('projectId') projectId: string,
        @Args('input') input: ProjectUpdateInput, // eslint-disable-line @typescript-eslint/indent
    ): Promise<Project> {
        const project = await this.projectService.findOne(projectId);

        return await this.projectService.updateOne(project, input);
    }

    // ================================================================================================================

    @Mutation(() => Boolean)
    @UseGuards(AuthGuard)
    deleteProject(
        @Args('projectId') projectId: string,
    ): Promise<boolean> {
        return this.projectService.deleteOne(projectId);
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    @ResolveField()
    owner(
        @Parent() { ownerId }: Project,
    ): Promise<User> {
        return this.userService.findOneById(ownerId);
    }

    // ================================================================================================================

    @ResolveField()
    workdays(
        @Parent() { id }: Project,
    ): Promise<Workday[]> {
        return this.workdayService.findProjectWorkdays(id);
    }

    // ================================================================================================================

    @ResolveField()
    locations(
        @Parent() { id }: Project,
    ): Promise<Location[]> {
        return this.locationService.findProjectLocations(id);
    }

    // ================================================================================================================

    @ResolveField()
    scenes(
        @Parent() { id }: Project,
    ): Promise<Scene[]> {
        return this.sceneService.findProjectScenes(id);
    }

    // ================================================================================================================

    @ResolveField()
    requisites(
        @Parent() { id }: Project,
    ): Promise<Requisite[]> {
        return this.requisiteService.findProjectRequisites(id);
    }
}
