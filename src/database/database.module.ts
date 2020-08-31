// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Entities
import { User } from '../bus/User/user.entity';
import { Project } from '../bus/Project/project.entity';
import { Workday } from '../bus/Workday/workday.entity';
import { Location } from '../bus/Location/location.entity';
import { Scene } from '../bus/Scene/scene.entity';
import { Requisite } from '../bus/Requisite/requisite.entity';
import { ReqType } from '../bus/ReqType/reqType.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports:    [ ConfigModule ],
            inject:     [ ConfigService ],
            useFactory: (configService: ConfigService) => {
                const isProd = configService.get('NODE_ENV') === 'production';

                return {
                    type:        'postgres',
                    url:         configService.get('DATABASE_URL'),
                    dropSchema:  !isProd && false,
                    synchronize: !isProd && true,
                    logging:     !isProd && false,
                    entities:    [ User, Project, Workday, Location, Scene, Requisite, ReqType ],
                    migrations:  [ 'src/migration/**/*.ts' ],
                    // subscribers: [ 'src/subscriber/**/*.ts' ],
                    cli:         {
                        migrationsDir: 'migration',
                        // subscribersDir: 'src/subscriber',
                    },
                };
            },
        }),
    ],
})
export class DatabaseModule {}
