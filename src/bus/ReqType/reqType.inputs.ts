// Core
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

@InputType()
export class ReqTypeCreateInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    name: string;
}

@InputType()
export class ReqTypeUpdateInput {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    name?: string;
}
