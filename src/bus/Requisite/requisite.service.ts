// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Instruments
import { Requisite } from './requisite.entity';
import { RequisiteCreateInput } from './requisite.inputs';
import { Project } from '../Project/project.entity';
// import { Scene } from '../Scene/scene.entity';

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
        return this.requisiteRepository.find({ where: { projectId }});
    }

    // ================================================================================================================

    findScenesRequisites(sceneId: string): Promise<Requisite[]> {
        return this.requisiteRepository.find({ where: { scenes: sceneId }});
    }

    // ================================================================================================================

    async findOne(id: string): Promise<Requisite> {
        const requisite = await this.requisiteRepository.findOne(id);

        if (!requisite) {
            throw new BadRequestException('Project does not exist');
        }

        return requisite;
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
        await this.requisiteRepository.delete(id);

        return id;
    }
}
