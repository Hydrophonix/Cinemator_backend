// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import _ from 'lodash';

// Entities
import { Scene } from '../Scene/scene.entity';
import { Location } from './location.entity';

// Instruments
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

    async findManyByIds(locationIds: string[]): Promise<Location[]> {
        if (locationIds.length === 0) {
            return [];
        }

        return await this.locationRepository.findByIds(locationIds);
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

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    async findLocationScenes(locationId: string): Promise<Scene[]> {
        try {
            const scenes = await this.locationRepository
                .createQueryBuilder()
                .relation('scenes')
                .of(locationId)
                .loadMany<Scene>();

            return _.orderBy(scenes, (scene) => scene.number);
        } catch (error) {
            throw new BadRequestException(`Location id:${locationId} does not exist`);
        }
    }
}
