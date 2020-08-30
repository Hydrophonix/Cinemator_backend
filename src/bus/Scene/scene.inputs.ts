// Core
import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';

// Entities
import { Scene } from './scene.entity';
import { Requisite } from '../Requisite/requisite.entity';
import { Location } from '../Location/location.entity';
import { Workday } from '../Workday/workday.entity';

@InputType()
export class SceneCreateInput {
    @Field(() => Int)
    @IsNumber()
    number: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    title?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    description?: string;
}

@InputType()
export class SceneUpdateInput {
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    number?: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    title?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    description?: string;

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;
}

@ObjectType()
export class SceneUpdateRequisitesResponse {
    @Field(() => Scene)
    updatedScene: Scene;

    @Field(() => [ Requisite ])
    updatedRequisites: Requisite[];
}

@ObjectType()
export class SceneUpdateLocationsResponse {
    @Field(() => Scene)
    updatedScene: Scene;

    @Field(() => [ Location ])
    updatedLocations: Location[];
}

@ObjectType()
export class SceneUpdateWorkdaysResponse {
    @Field(() => Scene)
    updatedScene: Scene;

    @Field(() => [ Workday ])
    updatedWorkdays: Workday[];
}
