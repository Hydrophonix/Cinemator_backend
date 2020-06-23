// Core
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

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
