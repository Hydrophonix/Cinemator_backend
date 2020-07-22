// Core
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsEmail, IsString } from 'class-validator';

@InputType()
export class UserUpdateInput {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    phone?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    name?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsEmail()
    email?: string;
}
