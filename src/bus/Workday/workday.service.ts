// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Instruments
import { Project } from '../Project/project.entity';
import { Workday } from './workday.entity';
import { WorkdayCreateInput, WorkdayUpdateInput } from './workday.inputs';

@Injectable()
export class WorkdayService {
    constructor(
        @InjectRepository(Workday)
        private readonly workdayRepository: Repository<Workday>,
    ) {}

    createOne(input: WorkdayCreateInput, project: Project): Promise<Workday> {
        const workday = {
            ...input,
            project,
        };

        return this.workdayRepository.save(workday);
    }

    findProjectWorkdays(projectId: string): Promise<Workday[]> {
        return this.workdayRepository.find({ where: { projectId }});
    }

    async findOne(id: string): Promise<Workday> {
        const workday = await this.workdayRepository.findOne(id);

        if (!workday) {
            throw new BadRequestException('Workday does not exist');
        }

        return workday;
    }

    async findOneByDate(date: string): Promise<Workday> {
        const workday = await this.workdayRepository.findOne({ where: { date }});

        if (!workday) {
            throw new BadRequestException('Workday does not exist');
        }

        return workday;
    }

    updateOne(workday: Workday, input: WorkdayUpdateInput): Promise<Workday> {
        const data = {
            ...workday,
            ...input,
        };

        return this.workdayRepository.save(data);
    }

    async deleteOne(id: string): Promise<string> {
        await this.workdayRepository.delete(id);

        return id;
    }
}
