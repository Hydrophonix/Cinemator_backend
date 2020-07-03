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

@ObjectType()
export class SceneUpdateRequisitesResponse {
    @Field(() => Scene)
    updatedScene: Scene;

    @Field(() => [ Requisite ])
    updatedRequisites: Requisite[];
}

// @InputType()
// export class SceneUpdateInput {
//     @Field(() => String, { nullable: true })
//     @IsNotEmpty()
//     title?: string;

//     @Field(() => String, { nullable: true })
//     @IsISO8601()
//     startDay?: string;

//     @Field(() => String, { nullable: true })
//     @IsISO8601()
//     endDay?: string;
// }
