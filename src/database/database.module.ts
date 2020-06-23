// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Entities
import { User } from '../bus/User/user.entity';
import { Project } from '../bus/Project/project.entity';
import { Workday } from '../bus/Workday/workday.entity';
import { Scene } from '../bus/Scene/scene.entity';
import { Requisite } from '../bus/Requisite/requisite.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports:    [ ConfigModule ],
            inject:     [ ConfigService ],
            useFactory: (configService: ConfigService) => ({
                type:        'postgres',
                url:         configService.get('DATABASE_URL'),
                dropSchema:  false,
                synchronize: true,  // switch this to false once you have the initial tables created and use migrations instead
                logging:     false,
                entities:    [ User, Project, Workday, Scene, Requisite ],
                migrations:  [ 'src/migration/**/*.ts' ],
                subscribers: [ 'src/subscriber/**/*.ts' ],
                cli:         {
                    entitiesDir:    'src/entity',
                    migrationsDir:  'src/migration',
                    subscribersDir: 'src/subscriber',
                },
            }),
        }),
    ],
})
export class DatabaseModule {}
