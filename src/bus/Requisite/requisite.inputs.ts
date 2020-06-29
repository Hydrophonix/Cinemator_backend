// Core
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsBoolean } from 'class-validator';

@InputType()
export class RequisiteCreateInput {
    @Field(() => String, { nullable: true })
    @IsString()
    title?: string;

    @Field(() => String, { nullable: true })
    @IsString()
    description?: string;

    @Field(() => Boolean, { defaultValue: false })
    @IsBoolean()
    isOrdered?: boolean;

    @Field(() => Int, { defaultValue: 0 })
    @IsNumber()
    pricePerDay?: number;
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
