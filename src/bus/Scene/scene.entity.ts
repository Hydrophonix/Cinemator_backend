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
import { Location } from '../Location/location.entity';

@ObjectType()
@Entity()
export class Scene extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => Number)
    @Column('int')
    number: number;

    @Field(() => String, { nullable: true })
    @Column('text', { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    @Column('text', { nullable: true })
    description?: string;

    // ================================================================================================================
    // Relations
    // ================================================================================================================

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

    @Field(() => [ Location ])
    @ManyToMany(() => Location, (location: Location) => location.scenes)
    @JoinTable()
    locations: Location
}
