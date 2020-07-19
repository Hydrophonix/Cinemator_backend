// Core
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LocationCreateInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    name: string;
}

@InputType()
export class LocationUpdateInput {
    @Field(() => String, { nullable: true })
    @IsString()
    name?: string;
}
