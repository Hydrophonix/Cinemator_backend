// Core
import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class ProjectCreateInput {
    @Field(() => String)
    @IsNotEmpty()
    title: string;

    @Field(() => String)
    @IsDate()
    startDay: string;

    @Field(() => String)
    @IsDate()
    endDay:string;
}

@InputType()
export class ProjectUpdateInput {
    @Field(() => String, { nullable: true })
    @IsNotEmpty()
    title?: string;

    @Field(() => String, { nullable: true })
    @IsDate()
    startDay?: string;

    @Field(() => String, { nullable: true })
    @IsDate()
    endDay?: string;
}
