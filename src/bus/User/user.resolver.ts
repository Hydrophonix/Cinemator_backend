// Core
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';

// Entities
import { User } from './user.entity';
import { Project } from '../Project/project.entity';

// Services
import { UserService } from './user.service';
import { ProjectService } from '../Project/project.service';

// Instruments
import { IContextUser } from '../../graphql/graphql.interfaces';
import { CurrentUser } from '../Auth/auth.decorators';
import { AuthGuard } from '../Auth/auth.guard';

@Resolver(() => User)
export class UserResolver {
    constructor(
        @Inject(ProjectService)
        private readonly projectService: ProjectService,
        private readonly userService: UserService,
    ) {}

    // ================================================================================================================

    @Query(() => User)
    @UseGuards(AuthGuard)
    me(@CurrentUser() { id }: IContextUser) {
        return this.userService.findOne(id);
    }

    // ================================================================================================================

    @Query(() => [ User ])
    users() {
        return this.userService.findAll();
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    @ResolveField()
    projects(@Parent() { id }: User): Promise<Project[]> {
        return this.projectService.findOwnedProjects(id);
    }
}
