// Core
import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';

// Entities
import { Project } from '../Project/project.entity';
import { Requisite } from '../Requisite/requisite.entity';
import { Workday } from '../Workday/workday.entity';

@ObjectType()
@Entity()
export class Scene extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String, { nullable: true })
    @Column('text', { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    @Column('text', { nullable: true })
    location?: string;

    @Field(() => Number)
    @Column('int')
    sceneNumber: number;

    // ----------------------------------------------------------------------------------------------------------------
    // Relations
    // ----------------------------------------------------------------------------------------------------------------

    @Field()
    @Column()
    projectId: string;

    @Field(() => Project)
    @ManyToOne(() => Project, (project: Project) => project.scenes)
    @JoinColumn({ name: 'projectId' })
    project: Project

    @Field(() => [ Workday ])
    @ManyToMany(() => Workday, (workday: Workday) => workday.scenes)
    workdays: [ Workday ]

    @Field(() => [ Requisite ])
    @ManyToMany(() => Requisite, (requisite: Requisite) => requisite.scenes)
    @JoinTable()
    requisites: Requisite
}
