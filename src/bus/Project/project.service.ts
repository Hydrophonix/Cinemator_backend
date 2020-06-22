// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

// Instruments
import { Project } from './project.entity';
import { User } from '../User/user.entity';
import { ProjectCreateInput, ProjectUpdateInput } from './project.inputs';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {}

    createOne(input: ProjectCreateInput, user: User): Promise<Project> {
        const project = {
            ...input,
            user,
        };

        return this.projectRepository.save(project);
    }

    findAll(): Promise<Project[]> {
        return this.projectRepository.find();
    }

    async findOne(id: string): Promise<Project> {
        const project = await this.projectRepository.findOne(id);

        if (!project) {
            throw new BadRequestException('Project does not exist');
        }

        return project;
    }

    findOwnedProjects(ownerId: string): Promise<Project[]> {
        return this.projectRepository.find({ where: { ownerId }});
    }

    updateOne(project: Project, input: ProjectUpdateInput): Promise<Project> {
        const data = {
            ...project,
            ...input,
        };

        return this.projectRepository.save(data);
    }

    deleteOne(id: string): Promise<DeleteResult> {
        return this.projectRepository.delete(id);
    }
}
