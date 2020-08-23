// Core
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

// Entities
import { Project } from '../Project/project.entity';
import { Requisite } from '../Requisite/requisite.entity';

@ObjectType()
@Entity()
export class ReqType extends BaseEntity {
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
    @ManyToOne(() => Project, (project: Project) => project.reqTypes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'projectId' })
    project: Project

    @Field(() => [ Requisite ])
    @ManyToMany(() => Requisite, (requisite: Requisite) => requisite.reqTypes)
    requisites: [ Requisite ]
}
