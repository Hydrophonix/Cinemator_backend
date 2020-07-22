// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import _ from 'lodash';

// Entities
import { Scene } from '../Scene/scene.entity';
import { Project } from '../Project/project.entity';
import { Requisite } from './requisite.entity';

// Instruments
import { RequisiteCreateInput, RequisiteUpdateInput } from './requisite.inputs';

@Injectable()
export class RequisiteService {
    constructor(
        @InjectRepository(Requisite)
        private readonly requisiteRepository: Repository<Requisite>,
    ) {}

    // ================================================================================================================

    createOne(input: RequisiteCreateInput, project: Project): Promise<Requisite> {
        const requisite: Partial<Requisite> = {
            ...input,
            projectId: project.id,
        };

        return this.requisiteRepository.save(requisite);
    }

    // ================================================================================================================

    findProjectRequisites(projectId: string): Promise<Requisite[]> {
        return this.requisiteRepository.find({
            where: { projectId },
            order: { number: 1 },
        });
    }

    // ================================================================================================================

    async findOneById(requisiteId: string): Promise<Requisite> {
        const requisite = await this.requisiteRepository.findOne(requisiteId);

        if (!requisite) {
            throw new BadRequestException('Requisite does not exist');
        }

        return requisite;
    }

    // ================================================================================================================

    async findManyByIds(requisiteIds: Array<string>): Promise<Requisite[]> {
        if (requisiteIds.length === 0) {
            return [];
        }

        return await this.requisiteRepository.findByIds(
            requisiteIds,
            { order: { number: 1 }},
        );
    }

    // ================================================================================================================

    updateOne(requisite: Requisite, input: RequisiteUpdateInput): Promise<Requisite> {
        const data: Partial<Requisite> = {
            ...requisite,
            ...input,
        };

        return this.requisiteRepository.save(data);
    }

    // ================================================================================================================

    async deleteOne(id: string): Promise<boolean> {
        try {
            await this.requisiteRepository.delete(id);

            return true;
        } catch (error) {
            return false;
        }
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    async findRequisiteScenes(requisiteId: string): Promise<Scene[]> {
        try {
            const scenes = await this.requisiteRepository
                .createQueryBuilder()
                .relation('scenes')
                .of(requisiteId)
                .loadMany<Scene>();

            return _.orderBy(scenes, (scene) => scene.number);
        } catch (error) {
            throw new BadRequestException(`Requisite id:${requisiteId} does not exist`);
        }
    }

    // ================================================================================================================

    async updateScenesRelation(
        requisiteId: string,
        addSceneIds: string[],
        removeSceneIds: string[],
    ): Promise<boolean> {
        try {
            await this.requisiteRepository
                .createQueryBuilder()
                .relation('scenes')
                .of(requisiteId)
                .addAndRemove(addSceneIds, removeSceneIds);

            return true;
        } catch (error) {
            throw new BadRequestException(`Add scenes to requisite: ${requisiteId} failed.`);
        }
    }
}
