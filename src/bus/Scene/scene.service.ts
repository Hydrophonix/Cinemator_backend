// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Instruments
import { Scene } from './scene.entity';
import { SceneCreateInput } from './scene.inputs';
import { Project } from '../Project/project.entity';
import { Workday } from '../Workday/workday.entity';

@Injectable()
export class SceneService {
    constructor(
        @InjectRepository(Scene)
        private readonly sceneRepository: Repository<Scene>,
    ) {}

    // ================================================================================================================

    createOne(input: SceneCreateInput, project: Project, workday: Workday): Promise<Scene> {
        const scene: Partial<Scene> = {
            ...input,
            projectId: project.id,
            workdays:  [ workday ],
        };

        return this.sceneRepository.save(scene);
    }

    // ================================================================================================================

    findProjectScenes(projectId: string): Promise<Scene[]> {
        return this.sceneRepository.find({ where: { projectId }});
    }

    // ================================================================================================================

    findWorkdayScenes(workdayId: string): Promise<Scene[]> {
        return this.sceneRepository.find({ where: { workdays: workdayId }});
    }

    // ================================================================================================================

    async findOne(id: string): Promise<Scene> {
        const scene = await this.sceneRepository.findOne(id);

        if (!scene) {
            throw new BadRequestException('Project does not exist');
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

    async deleteOne(id: string): Promise<string> {
        await this.sceneRepository.delete(id);

        return id;
    }
}
