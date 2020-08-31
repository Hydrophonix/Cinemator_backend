// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import _ from 'lodash';

// Entities
import { Scene } from './scene.entity';
import { Project } from '../Project/project.entity';
import { Workday } from '../Workday/workday.entity';
import { Location } from '../Location/location.entity';
import { Requisite } from '../Requisite/requisite.entity';

// Instruments
import { SceneCreateInput, SceneUpdateInput } from './scene.inputs';

@Injectable()
export class SceneService {
    constructor(
        @InjectRepository(Scene)
        private readonly sceneRepository: Repository<Scene>,
    ) {}

    // ================================================================================================================

    createOne(input: SceneCreateInput, project: Project): Promise<Scene> {
        const scene: Partial<Scene> = {
            ...input,
            projectId: project.id,
        };

        return this.sceneRepository.save(scene);
    }

    // ================================================================================================================

    findProjectScenes(projectId: string): Promise<Scene[]> {
        return this.sceneRepository.find({
            where: { projectId },
            order: { number: 1 },
        });
    }

    // ================================================================================================================

    async findOneById(id: string): Promise<Scene> {
        const scene = await this.sceneRepository.findOne(id);

        if (!scene) {
            throw new BadRequestException('Scene does not exist');
        }

        return scene;
    }

    // ================================================================================================================

    async findManyByIds(scenesIds: Array<string>): Promise<Scene[]> {
        if (scenesIds.length === 0) {
            return [];
        }

        return await this.sceneRepository.findByIds(
            scenesIds,
            { order: { number: 1 }},
        );
    }

    // ================================================================================================================

    updateOne(scene: Scene, input: SceneUpdateInput): Promise<Scene> {
        const data: Partial<Scene> = {
            ...scene,
            ...input,
        };

        return this.sceneRepository.save(data);
    }

    // ================================================================================================================

    async deleteOne(id: string): Promise<boolean> {
        try {
            await this.sceneRepository.delete(id);

            return true;
        } catch (error) {
            return false;
        }
    }

    // ================================================================================================================

    async deleteProjectScenes(projectId: string): Promise<boolean> {
        try {
            await this.sceneRepository.createQueryBuilder()
                .delete()
                // .from(Location)
                .where('projectId = :projectId', { projectId })
                .execute();

            return true;
        } catch (error) {
            return false;
        }
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    async updateRequisitesRelation(
        sceneId: string,
        addRequisiteIds: string[],
        removeRequisiteIds: string[],
    ): Promise<boolean> {
        try {
            await this.sceneRepository
                .createQueryBuilder()
                .relation('requisites')
                .of(sceneId)
                .addAndRemove(addRequisiteIds, removeRequisiteIds);

            return true;
        } catch (error) {
            throw new BadRequestException(`Add requisites to scene: ${sceneId} failed.`);
        }
    }

    // ================================================================================================================

    async updateLocationsRelation(
        sceneId: string,
        addLocationIds: string[],
        removeLocationIds: string[],
    ): Promise<boolean> {
        try {
            await this.sceneRepository
                .createQueryBuilder()
                .relation('locations')
                .of(sceneId)
                .addAndRemove(addLocationIds, removeLocationIds);

            return true;
        } catch (error) {
            throw new BadRequestException(`Add locations to scene: ${sceneId} failed.`);
        }
    }

    // ================================================================================================================

    async updateWorkdaysRelation(
        sceneId: string,
        addWorkdayIds: string[],
        removeWorkdayIds: string[],
    ): Promise<boolean> {
        try {
            await this.sceneRepository
                .createQueryBuilder()
                .relation('workdays')
                .of(sceneId)
                .addAndRemove(addWorkdayIds, removeWorkdayIds);

            return true;
        } catch (error) {
            throw new BadRequestException(`Add workdays to scene: ${sceneId} failed.`);
        }
    }

    // ================================================================================================================

    async addRequisites(sceneId: string, requisitesIds: string[]): Promise<boolean> {
        try {
            await this.sceneRepository
                .createQueryBuilder()
                .relation('requisites')
                .of(sceneId)
                .add(requisitesIds);

            return true;
        } catch (error) {
            return false;
        }
    }

    // ================================================================================================================

    async removeRequisites(sceneId: string, requisitesIds: string[]): Promise<boolean> {
        try {
            await this.sceneRepository
                .createQueryBuilder()
                .relation('requisites')
                .of(sceneId)
                .remove(requisitesIds);

            return true;
        } catch (error) {
            return false;
        }
    }

    // ================================================================================================================

    async findSceneRequisites(sceneId: string): Promise<Requisite[]> {
        try {
            const requisites = await this.sceneRepository
                .createQueryBuilder()
                .relation('requisites')
                .of(sceneId)
                .loadMany<Requisite>();

            return _.orderBy(requisites, (requisite) => requisite.number);
        } catch (error) {
            throw new BadRequestException(`Scene id:${sceneId} does not exist`);
        }
    }

    // ================================================================================================================

    async findSceneWorkdays(sceneId: string): Promise<Workday[]> {
        try {
            const workdays = await this.sceneRepository
                .createQueryBuilder()
                .relation('workdays')
                .of(sceneId)
                .loadMany<Workday>();

            return _.orderBy(workdays, (workday) => new Date(workday.date));
        } catch (error) {
            throw new BadRequestException(`Scene id:${sceneId} does not exist`);
        }
    }

    // ================================================================================================================

    findSceneLocations(sceneId: string): Promise<Location[]> {
        try {
            return this.sceneRepository
                .createQueryBuilder()
                .relation('locations')
                .of(sceneId)
                .loadMany<Location>();
        } catch (error) {
            throw new BadRequestException(`Scene id:${sceneId} does not exist`);
        }
    }
}
