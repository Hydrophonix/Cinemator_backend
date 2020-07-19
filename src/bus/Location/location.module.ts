// Core
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { ProjectModule } from '../Project/project.module';

// Instruments
import { Location } from './location.entity';
import { LocationService } from './location.service';
import { LocationResolver } from './location.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([ Location ]),
        forwardRef(() => ProjectModule),
    ],
    providers: [ LocationService, LocationResolver ],
    exports:   [ LocationService ],
})
export class LocationModule {}
