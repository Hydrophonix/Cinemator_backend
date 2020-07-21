// Core
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class RequisiteCreateInput {
    @Field(() => Int)
    @IsNumber()
    number: number;

    @Field(() => String)
    @IsString()
    title: string;

    @Field(() => String, { nullable: true })
    @IsString()
    description?: string;
}

@InputType()
export class RequisiteUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    description?: string;
}
