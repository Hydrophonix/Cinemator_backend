// Core
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserUpdateInput {
    @Field(() => String, { nullable: true })
    testbig?: string;

    @Field(() => String, { nullable: true })
    password?: string;
}
