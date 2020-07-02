// Core
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { ProjectModule } from '../Project/project.module';

// Instruments
import { Workday } from './workday.entity';
import { WorkdayService } from './workday.service';
import { WorkdayResolver } from './workday.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([ Workday ]),
        forwardRef(() => ProjectModule),
    ],
    providers: [ WorkdayService, WorkdayResolver ],
    exports:   [ WorkdayService ],
})
export class WorkdayModule {}
