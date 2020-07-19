// Core
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

// Entities
import { Project } from '../Project/project.entity';

@ObjectType()
@Entity()
export class Location extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    name: string;

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    @Field()
    @Column()
    projectId: string;

    @Field(() => Project)
    @ManyToOne(() => Project, (project: Project) => project.locations)
    @JoinColumn({ name: 'projectId' })
    project: Project
}
