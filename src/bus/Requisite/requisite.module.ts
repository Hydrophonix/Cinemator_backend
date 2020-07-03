import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { ProjectModule } from '../Project/project.module';

// Instruments
import { Requisite } from './requisite.entity';
import { RequisiteResolver } from './requisite.resolver';
import { RequisiteService } from './requisite.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ Requisite ]),
        forwardRef(() => ProjectModule),

    ],
    providers: [ RequisiteResolver, RequisiteService ],
    exports:   [ RequisiteService ],
})
export class RequisiteModule {}
