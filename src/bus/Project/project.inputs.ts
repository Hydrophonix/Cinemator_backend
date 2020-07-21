// Core
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ProjectCreateInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field(() => String, { nullable: true })
    @IsString()
    description?: string;
}

@InputType()
export class ProjectUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    @IsString()
    description?: string;
}
