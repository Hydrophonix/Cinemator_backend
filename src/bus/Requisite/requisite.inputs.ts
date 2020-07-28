// Core
import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

// Entities
import { Requisite } from './requisite.entity';
import { Scene } from '../Scene/scene.entity';
import { ReqType } from '../ReqType/reqType.entity';

@InputType()
export class RequisiteCreateInput {
    @Field(() => Int)
    @IsNumber()
    number: number;

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
export class RequisiteUpdateInput {
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

@ObjectType()
export class RequisiteUpdateScenesResponse {
    @Field(() => Requisite)
    updatedRequisite: Requisite;

    @Field(() => [ Scene ])
    updatedScenes: Scene[];
}

@ObjectType()
export class RequisiteUpdateReqTypesResponse {
    @Field(() => Requisite)
    updatedRequisite: Requisite;

    @Field(() => [ ReqType ])
    updatedReqTypes: ReqType[];
}
