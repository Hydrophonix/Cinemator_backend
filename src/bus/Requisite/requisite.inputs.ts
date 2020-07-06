// Core
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsBoolean } from 'class-validator';

@InputType()
export class RequisiteCreateInput {
    @Field(() => String)
    @IsString()
    title: string;

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

@InputType()
export class RequisiteUpdateInput {
    @Field(() => String, { nullable: true })
    @IsString()
    title?: string;

    @Field(() => String, { nullable: true })
    @IsString()
    description?: string;

    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    isOrdered?: boolean;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    pricePerDay?: number;
}
