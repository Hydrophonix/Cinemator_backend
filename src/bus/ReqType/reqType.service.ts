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
        private readonly reqTypeRepository: Repository<ReqType>,
    ) {}

    // ================================================================================================================

    createOne(input: ReqTypeCreateInput, projectId: string): Promise<ReqType> {
        const type: Partial<ReqType> = {
            ...input,
            projectId,
        };

        return this.reqTypeRepository.save(type);
    }

    // ================================================================================================================

    findProjectReqTypes(projectId: string): Promise<ReqType[]> {
        return this.reqTypeRepository.find({ where: { projectId }});
    }

    // ================================================================================================================

    async findManyByIds(reqTypeIds: string[]): Promise<ReqType[]> {
        if (reqTypeIds.length === 0) {
            return [];
        }

        return await this.reqTypeRepository.findByIds(reqTypeIds);
    }

    // ================================================================================================================

    async findOneById(id: string): Promise<ReqType> {
        const reqType = await this.reqTypeRepository.findOne(id);

        if (!reqType) {
            throw new BadRequestException('ReqType does not exist');
        }

        return reqType;
    }

    // ================================================================================================================

    updateOne(reqType: ReqType, input: ReqTypeUpdateInput): Promise<ReqType> {
        const data: Partial<ReqType> = {
            ...reqType,
            ...input,
        };

        return this.reqTypeRepository.save(data);
    }

    // ================================================================================================================

    async deleteOne(id: string): Promise<boolean> {
        try {
            await this.reqTypeRepository.delete(id);

            return true;
        } catch (error) {
            return false;
        }
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    async findReqTypeRequisites(reqTypeId: string): Promise<Requisite[]> {
        try {
            const requisites = await this.reqTypeRepository
                .createQueryBuilder()
                .relation('requisites')
                .of(reqTypeId)
                .loadMany<Requisite>();

            return _.orderBy(requisites, (requisite) => requisite.number);
        } catch (error) {
            throw new BadRequestException(`ReqType id:${reqTypeId} does not exist`);
        }
    }
}
