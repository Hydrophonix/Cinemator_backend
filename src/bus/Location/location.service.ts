// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Instruments
import { Location } from './location.entity';
import { Repository } from 'typeorm';
import { LocationCreateInput, LocationUpdateInput } from './location.inputs';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Location)
        private readonly locationRepository: Repository<Location>,
    ) {}

    // ================================================================================================================

    createOne(input: LocationCreateInput, projectId: string): Promise<Location> {
        const location: Partial<Location> = {
            ...input,
            projectId,
        };

        // console.log('"|_(ʘ_ʘ)_/" =>: LocationService -> location', location);
        // const location2: Partial<Location> = {
        //     name:      'test',
        //     projectId: 'toje test',
        // };

        return this.locationRepository.save(location);
    }

    // ================================================================================================================

    findProjectLocations(projectId: string): Promise<Location[]> {
        return this.locationRepository.find({ where: { projectId }});
    }

    // ================================================================================================================

    async findOneById(id: string): Promise<Location> {
        const location = await this.locationRepository.findOne(id);

        if (!location) {
            throw new BadRequestException('Location does not exist');
        }

        return location;
    }

    // ================================================================================================================

    updateOne(location: Location, input: LocationUpdateInput): Promise<Location> {
        // try {
        //     const loca = await this.locationRepository.update(locationId, input);
        // } catch (error) {
        //     throw new BadRequestException('Location does not exist');
        // }
        const data: Partial<Location> = {
            ...location,
            ...input,
        };

        return this.locationRepository.save(data);
    }

    // ================================================================================================================

    async deleteOne(id: string): Promise<boolean> {
        try {
            await this.locationRepository.delete(id);

            return true;
        } catch (error) {
            return false;
        }
    }
}
