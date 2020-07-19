// Core
import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

// Entities
import { Scene } from './scene.entity';
import { Requisite } from '../Requisite/requisite.entity';

@InputType()
export class SceneCreateInput {
    @Field(() => Int)
    @IsNumber()
    number: number;

    @Field(() => String, { nullable: true })
    @IsString()
    description?: string;

    @Field(() => String, { nullable: true })
    @IsString()
    location?: string;
}

@InputType()
export class SceneUpdateInput {
    @Field(() => Int, { nullable: true })
    @IsNumber()
    number?: number;

    @Field(() => String, { nullable: true })
    @IsString()
    description?: string;

    @Field(() => String, { nullable: true })
    @IsString()
    location?: string;
}

@ObjectType()
export class SceneUpdateRequisitesResponse {
    @Field(() => Scene)
    updatedScene: Scene;

    @Field(() => [ Requisite ])
    updatedRequisites: Requisite[];
}
