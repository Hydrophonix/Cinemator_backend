// Core
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

// Entities
import { User } from '../User/user.entity';
import { Scene } from '../Scene/scene.entity';
import { Requisite } from '../Requisite/requisite.entity';
import { Workday } from '../Workday/workday.entity';
import { Location } from '../Location/location.entity';
import { ReqType } from '../ReqType/reqType.entity';

@ObjectType()
@Entity()
export class Project extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    title: string;

    @Field(() => String, { nullable: true })
    @Column('text', { nullable: true })
    description?: string;

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    @Field()
    @Column()
    ownerId: string;

    @Field(() => User)
    @ManyToOne(() => User, (user: User) => user.projects, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ownerId' })
    owner: User

    @Field(() => [ Workday ])
    @OneToMany(() => Scene, (workday: Workday) => workday.projectId)
    workdays: [ Workday ]

    @Field(() => [ Location ])
    @OneToMany(() => Location, (location: Location) => location.projectId)
    locations: [ Location ]

    @Field(() => [ ReqType ])
    @OneToMany(() => ReqType, (reqType: ReqType) => reqType.projectId)
    reqTypes: [ ReqType ]

    @Field(() => [ Scene ])
    @OneToMany(() => Scene, (scene: Scene) => scene.projectId)
    scenes: [ Scene ]

    @Field(() => [ Requisite ])
    @OneToMany(() => Requisite, (requisite: Requisite) => requisite.projectId)
    requisites: [ Requisite ]
}
