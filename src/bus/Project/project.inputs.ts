// Core
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsISO8601 } from 'class-validator';

@InputType()
export class ProjectCreateInput {
    @Field(() => String)
    @IsNotEmpty()
    title: string;

    @Field(() => String)
    @IsISO8601()
    startDay: string;

    @Field(() => String)
    @IsISO8601()
    endDay:string;
}

@InputType()
export class ProjectUpdateInput {
    @Field(() => String, { nullable: true })
    @IsNotEmpty()
    title?: string;

    @Field(() => String, { nullable: true })
    @IsISO8601()
    startDay?: string;

    @Field(() => String, { nullable: true })
    @IsISO8601()
    endDay?: string;
}
