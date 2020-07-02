// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Scene } from './scene.entity';
import { Project } from '../Project/project.entity';
import { Workday } from '../Workday/workday.entity';
import { Requisite } from '../Requisite/requisite.entity';

// Instruments
import { SceneCreateInput } from './scene.inputs';

@Injectable()
export class SceneService {
    constructor(
        @InjectRepository(Scene)
        private readonly sceneRepository: Repository<Scene>,
    ) {}

    // ================================================================================================================

    createOne(input: SceneCreateInput, project: Project, workday?: Workday): Promise<Scene> {
        const scene: Partial<Scene> = {
            ...input,
            projectId: project.id,
        };

        if (workday) {
            scene.workdays =  [ workday ];
        }

        return this.sceneRepository.save(scene);
    }

    // ================================================================================================================

    findProjectScenes(projectId: string): Promise<Scene[]> {
        return this.sceneRepository.find({ where: { projectId }});
    }

    // ================================================================================================================

    async findOne(id: string): Promise<Scene> {
        const scene = await this.sceneRepository.findOne(id);

        if (!scene) {
            throw new BadRequestException('Scene does not exist');
        }

        return scene;
    }

    // ================================================================================================================
    // updateOne(scene: Project, input: sce): Promise<Project> {
    //     const data = {
    //         ...scene,
    //         ...input,
    //     };

    //     return this.projectRepository.save(data);
    // }

    async deleteOne(id: string): Promise<boolean> {
        try {
            await this.sceneRepository.delete(id);

            return true;
        } catch (error) {
            return false;
        }
    }

    // ================================================================================================================
    // Relations
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

    findSceneRequisites(sceneId: string): Promise<Requisite[]> {
        return this.sceneRepository
            .createQueryBuilder()
            .relation('requisites')
            .of(sceneId)
            .loadMany();
    }
    // ================================================================================================================

    findSceneWorkdays(sceneId: string): Promise<Workday[]> {
        return this.sceneRepository
            .createQueryBuilder()
            .relation('workdays')
            .of(sceneId)
            .loadMany();
    }
}
