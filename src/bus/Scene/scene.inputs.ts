// Core
import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

// Entities
import { Scene } from './scene.entity';
import { Requisite } from '../Requisite/requisite.entity';

@InputType()
export class SceneCreateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    location?: string;

    @Field(() => Int)
    @IsNumber()
    sceneNumber: number;
}

@InputType()
export class SceneUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    location?: string;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    sceneNumber?: number;
}

@ObjectType()
export class SceneUpdateRequisitesResponse {
    @Field(() => Scene)
    updatedScene: Scene;

    @Field(() => [ Requisite ])
    updatedRequisites: Requisite[];
}
