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
import { Scene } from '../Scene/scene.entity';

@ObjectType()
@Entity()
export class Workday extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String, { nullable: true })
    @Column('text', { nullable: true })
    title?: string;

    @Field()
    @Column('date', { unique: true })
    date: string;

    // ----------------------------------------------------------------------------------------------------------------
    // Relations
    // ----------------------------------------------------------------------------------------------------------------

    @Field()
    @Column()
    projectId: string;

    @Field(() => Project)
    @ManyToOne(() => Project, (project: Project) => project.workdays)
    @JoinColumn({ name: 'projectId' })
    project: Project

    @Field(() => [ Scene ])
    @ManyToMany(() => Scene, (scene: Scene) => scene.workdays)
    @JoinTable()
    scenes: [ Scene ]
}
