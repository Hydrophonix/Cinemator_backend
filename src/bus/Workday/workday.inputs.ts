// Core
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsISO8601, IsString } from 'class-validator';

// Entities
import { Workday } from './workday.entity';
import { Scene } from '../Scene/scene.entity';

@InputType()
export class WorkdayCreateInput {
    @Field(() => String)
    @IsISO8601()
    date: string;

    @Field(() => String, { nullable: true })
    @IsString()
    description?: string;
}

@InputType()
export class WorkdayUpdateInput {
    @Field(() => String)
    @IsISO8601()
    date: string;

    @Field(() => String, { nullable: true })
    @IsString()
    description?: string;
}

@ObjectType()
export class WorkdayUpdateScenesResponse {
    @Field(() => Workday)
    updatedWorkday: Workday;

    @Field(() => [ Scene ])
    updatedScenes: Scene[];
}
