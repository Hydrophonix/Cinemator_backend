// Core
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';

// Instruments
import { IContextUser } from '../../graphql/graphql.interfaces';
import { AuthGuard } from '../Auth/auth.guard';
import { CurrentUser } from '../Auth/auth.decorators';
import { UserService } from '../User/user.service';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { ProjectCreateInput, ProjectUpdateInput } from './project.inputs';


@Resolver('Project')
export class ProjectResolver {
    constructor(
        private readonly projectService: ProjectService,
        @Inject(UserService)
        private readonly userService: UserService,
    ) {}

    // ==============================================================================================

    @Mutation(() => Project, { description: 'Create new project' })
    @UseGuards(AuthGuard)
    async createProject(
        @Args('input') input: ProjectCreateInput,
        // eslint-disable-next-line @typescript-eslint/indent
        @CurrentUser() { id }: IContextUser,
    ): Promise<Project> {
        const user = await this.userService.findOne(id);

        return await this.projectService.createOne(input, user);
    }

    // ==============================================================================================

    @Query(() => [ Project ])
    @UseGuards(AuthGuard)
    async ownedProjects(@CurrentUser() { id }: IContextUser): Promise<Project[]> {
        return await this.projectService.findOwnedProjects(id);
    }

    // ==============================================================================================

    @Mutation(() => Project)
    @UseGuards(AuthGuard)
    async updateProject(
        @Args('id') id: string,
        // eslint-disable-next-line @typescript-eslint/indent
        @Args('input') input: ProjectUpdateInput,
    ): Promise<Project> {
        const project = await this.projectService.findOne(id);

        return await this.projectService.updateOne(project, input);
    }

    // ==============================================================================================

    @Mutation(() => String)
    async deleteProject(@Args('id') id: string): Promise<string> {
        await this.projectService.deleteOne(id);

        return id;
    }
}
