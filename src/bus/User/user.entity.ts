// Core
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
// import { IsEmail } from 'class-validator';

// Entity
import { Project } from '../Project/project.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('text', { unique: true })
    email: string;

    @Column()
    password: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    name?: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    phone?: string;

    @Column('int', { default: 0 })
    tokenVersion: number;
    // ================================================================================================================
    // Relations
    // ================================================================================================================

    @Field(() => [ Project ])
    @OneToMany(() => Project, (project: Project) => project.ownerId, { onDelete: 'CASCADE' })
    projects: Project[]

    // Todo: add projects by invites & User Roles
    // @Field(() => [ Project ], { nullable: true })
    // @OneToMany(() => Project, (project: Project) => project.ownerId)
    // projects: Project[]
}
