// Core
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

@InputType()
export class ProjectCreateInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    description?: string;
}

@InputType()
export class ProjectUpdateInput {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    description?: string;
}
