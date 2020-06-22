// Core
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

// Entities
import { Scene } from '../Scene/scene.entity';
import { Project } from '../Project/project.entity';

@ObjectType()
@Entity()
export class Requisite extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    title: string;

    @Field(() => String, { nullable: true })
    @Column('text', { nullable: true })
    description?: string;

    @Field(() => Boolean)
    @Column('boolean')
    isOrdered: boolean;

    @Field(() => Int)
    @Column('int')
    pricePerDay: number;

    // ----------------------------------------------------------------------------------------------------------------
    // Relations
    // ----------------------------------------------------------------------------------------------------------------

    @Field()
    @Column()
    projectId: string;

    @Field(() => Project)
    @ManyToOne(() => Project, (project: Project) => project.requisites)
    @JoinColumn({ name: 'projectId' })
    project: Project

    @Field(() => [ Scene ])
    @ManyToMany(() => Scene, (scene: Scene) => scene.requisites)
    scenes: Scene
}
