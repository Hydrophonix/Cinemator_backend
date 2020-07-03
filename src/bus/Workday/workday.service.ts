// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Workday } from './workday.entity';
import { Project } from '../Project/project.entity';
import { Scene } from '../Scene/scene.entity';

// Instruments
import { WorkdayCreateInput, WorkdayUpdateInput } from './workday.inputs';

@Injectable()
export class WorkdayService {
    constructor(
        @InjectRepository(Workday)
        private readonly workdayRepository: Repository<Workday>,
    ) {}

    // ================================================================================================================

    createOne(input: WorkdayCreateInput, project: Project): Promise<Workday> {
        const workday: Partial<Workday> = {
            ...input,
            projectId: project.id,
        };

        return this.workdayRepository.save(workday);
    }

    // ================================================================================================================

    async findOne(id: string): Promise<Workday> {
        const workday = await this.workdayRepository.findOne(id);

        if (!workday) {
            throw new BadRequestException('Workday does not exist');
        }

        return workday;
    }

    // ================================================================================================================

    updateOne(workday: Workday, input: WorkdayUpdateInput): Promise<Workday> {
        const data = {
            ...workday,
            ...input,
        };

        return this.workdayRepository.save(data);
    }

    // ================================================================================================================

    async deleteOne(id: string): Promise<boolean> {
        try {
            await this.workdayRepository.delete(id);

            return true;
        } catch (error) {
            return false;
        }
    }

    // ================================================================================================================

    findProjectWorkdays(projectId: string): Promise<Workday[]> {
        return this.workdayRepository.find({ where: { projectId }});
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    async addScenes(workdayId: string, sceneIds: string[]): Promise<boolean> {
        try {
            await this.workdayRepository
                .createQueryBuilder()
                .relation('scenes')
                .of(workdayId)
                .add(sceneIds);

            return true;
        } catch (error) {
            return false;
        }
    }

    // ================================================================================================================

    async removeScenes(workdayId: string, sceneIds: string[]): Promise<boolean> {
        try {
            await this.workdayRepository
                .createQueryBuilder()
                .relation('scenes')
                .of(workdayId)
                .remove(sceneIds);

            return true;
        } catch (error) {
            return false;
        }
    }

    // ================================================================================================================

    async updateScenesRelation(
        workdayId: string,
        addSceneIds: string[],
        removeSceneIds: string[],
    ): Promise<boolean> {
        try {
            await this.workdayRepository
                .createQueryBuilder()
                .relation('scenes')
                .of(workdayId)
                .addAndRemove(addSceneIds, removeSceneIds);

            return true;
        } catch (error) {
            throw new BadRequestException(`Add scenes to workday: ${workdayId} failed.`);
        }
    }

    // ================================================================================================================

    findWorkdayScenes(workdayId: string): Promise<Scene[]> {
        return this.workdayRepository
            .createQueryBuilder()
            .relation('scenes')
            .of(workdayId)
            .loadMany();
    }
}
