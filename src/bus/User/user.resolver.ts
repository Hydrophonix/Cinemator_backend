// Core
import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

// Instrumenta
import { User } from './user.entity';
import { UserService } from './user.service';

// Instruments
import { AuthGuard } from '../Auth/auth.guard';
import { IContextUser } from '../../graphql/graphql.interfaces';
import { CurrentUser } from '../Auth/auth.decorators';

@Resolver('User')
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Query(() => User)
    @UseGuards(AuthGuard)
    me(@CurrentUser() { id }: IContextUser) {
        return this.userService.findOne(id);
    }

    @Query(() => [ User ])
    users(
    // @Info() info: GraphQLResolveInfo,
    ) {
        return this.userService.findAll();
    }
}
