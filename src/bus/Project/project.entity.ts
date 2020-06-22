// Core
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

// Entities
import { User } from '../User/user.entity';
import { Scene } from '../Scene/scene.entity';
import { Requisite } from '../Requisite/requisite.entity';
import { Workday } from '../Workday/workday.entity';

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

    @Field()
    @Column('date')
    startDay: string;

    @Field()
    @Column('date')
    endDay: string;

    // ----------------------------------------------------------------------------------------------------------------
    // Relations
    // ----------------------------------------------------------------------------------------------------------------

    @Field()
    @Column()
    ownerId: string;

    @Field(() => User)
    @ManyToOne(() => User, (user: User) => user.projects)
    @JoinColumn({ name: 'ownerId' })
    owner: User

    @Field(() => [ Workday ])
    @OneToMany(() => Scene, (workday: Workday) => workday.projectId, { onDelete: 'CASCADE' })
    workdays: [ Workday ]

    @Field(() => [ Scene ])
    @OneToMany(() => Scene, (scene: Scene) => scene.projectId, { onDelete: 'CASCADE' })
    scenes: [ Scene ]

    @Field(() => [ Requisite ])
    @OneToMany(() => Requisite, (requisite: Requisite) => requisite.projectId, { onDelete: 'CASCADE' })
    requisites: [ Requisite ]


    // Todo
    // @Field(() => User)
    // @ManyToMany(() => User, (user: User) => user.projects)
    // @JoinColumn()
    // members: User
}
