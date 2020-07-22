// Core
import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

// Entities
import { Scene } from './scene.entity';
import { Requisite } from '../Requisite/requisite.entity';
import { Location } from '../Location/location.entity';

@InputType()
export class SceneCreateInput {
    @Field(() => Int)
    @IsNumber()
    number: number;

    @Field(() => String, { nullable: true })
    @IsString()
    title?: string;

    @Field(() => String, { nullable: true })
    @IsString()
    description?: string;
}

@InputType()
export class SceneUpdateInput {
    @Field(() => Int, { nullable: true })
    @IsNumber()
    number?: number;

    @Field(() => String, { nullable: true })
    @IsString()
    title?: string;

    @Field(() => String, { nullable: true })
    @IsString()
    description?: string;
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
