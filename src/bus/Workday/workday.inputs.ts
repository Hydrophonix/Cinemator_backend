// Core
import { InputType, Field } from '@nestjs/graphql';
import { IsISO8601 } from 'class-validator';

@InputType()
export class WorkdayCreateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String)
    @IsISO8601()
    date: string;
}

@InputType()
export class WorkdayUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    @IsISO8601()
    date?: string;
}
