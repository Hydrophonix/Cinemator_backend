// Core
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

// Entities
import { User } from '../User/user.entity';

@InputType()
export class AuthInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;
}

@ObjectType()
export class AuthResponseWeb {
    @Field(() => String)
    accessToken: string;

    @Field(() => User)
    user: User;
}
