// Core
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Modules
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AuthModule } from './bus/Auth/auth.module';
import { UserModule } from './bus/User/user.module';
import { ProjectModule } from './bus/Project/project.module';
import { SceneModule } from './bus/Scene/scene.module';
import { RequisiteModule } from './bus/Requisite/requisite.module';
import { WorkdayModule } from './bus/Workday/workday.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        GraphqlModule,
        AuthModule,
        UserModule,
        ProjectModule,
        SceneModule,
        RequisiteModule,
        WorkdayModule,
    ],
})
export class AppModule {}
