// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import _ from 'lodash';

// Entities
import { ReqType } from './reqType.entity';
import { Requisite } from '../Requisite/requisite.entity';

// Instruments
import { ReqTypeCreateInput, ReqTypeUpdateInput } from './reqType.inputs';

@Injectable()
export class ReqTypeService {
    constructor(
        @InjectRepository(ReqType)
        private readonly typeRepository: Repository<ReqType>,
    ) {}

    // ================================================================================================================

    createOne(input: ReqTypeCreateInput, projectId: string): Promise<ReqType> {
        const type: Partial<ReqType> = {
            ...input,
            projectId,
        };

        return this.typeRepository.save(type);
    }

    // ================================================================================================================

    findProjectReqTypes(projectId: string): Promise<ReqType[]> {
        return this.typeRepository.find({ where: { projectId }});
    }

    // ================================================================================================================

    async findManyByIds(typeIds: string[]): Promise<ReqType[]> {
        if (typeIds.length === 0) {
            return [];
        }

        return await this.typeRepository.findByIds(typeIds);
    }

    // ================================================================================================================

    async findOneById(id: string): Promise<ReqType> {
        const type = await this.typeRepository.findOne(id);

        if (!type) {
            throw new BadRequestException('ReqType does not exist');
        }

        return type;
    }

    // ================================================================================================================

    updateOne(type: ReqType, input: ReqTypeUpdateInput): Promise<ReqType> {
        const data: Partial<ReqType> = {
            ...type,
            ...input,
        };

        return this.typeRepository.save(data);
    }

    // ================================================================================================================

    async deleteOne(id: string): Promise<boolean> {
        try {
            await this.typeRepository.delete(id);

            return true;
        } catch (error) {
            return false;
        }
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    async findReqTypeRequisites(typeId: string): Promise<Requisite[]> {
        try {
            const requisites = await this.typeRepository
                .createQueryBuilder()
                .relation('requisites')
                .of(typeId)
                .loadMany<Requisite>();

            return _.orderBy(requisites, (requisite) => requisite.number);
        } catch (error) {
            throw new BadRequestException(`ReqType id:${typeId} does not exist`);
        }
    }
}
