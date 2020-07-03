// Core
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsISO8601 } from 'class-validator';

// Entities
import { Workday } from './workday.entity';
import { Scene } from '../Scene/scene.entity';

@InputType()
export class WorkdayCreateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String)
    @IsISO8601()
    date: string;
}

@InputType()
export class WorkdayUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    @IsISO8601()
    date?: string;
}

@ObjectType()
export class WorkdayUpdateScenesResponce {
    @Field(() => Workday)
    workday: Workday;

    @Field(() => [ Scene ])
    scenes: Scene[];
}
