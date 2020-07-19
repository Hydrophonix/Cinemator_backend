// Core
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ProjectCreateInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    title: string;

    // @Field(() => String)
    // @IsISO8601()
    // startDay: string;

    // @Field(() => String)
    // @IsISO8601()
    // endDay:string;
}

@InputType()
export class ProjectUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    // @Field(() => String, { nullable: true })
    // @IsISO8601()
    // startDay?: string;

    // @Field(() => String, { nullable: true })
    // @IsISO8601()
    // endDay?: string;
}
