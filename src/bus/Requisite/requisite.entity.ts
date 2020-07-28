// Core
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';

// Entities
import { Scene } from '../Scene/scene.entity';
import { Project } from '../Project/project.entity';
import { ReqType } from '../ReqType/reqType.entity';

@ObjectType()
@Entity()
export class Requisite extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => Number)
    @Column('int')
    number: number;

    @Field(() => String)
    @Column('text')
    title: string;

    @Field(() => String, { nullable: true })
    @Column('text', { nullable: true })
    description?: string;

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

    @Field(() => [ ReqType ])
    @ManyToMany(() => ReqType, (reqType: ReqType) => reqType.requisites)
    @JoinTable()
    reqTypes: ReqType
}
