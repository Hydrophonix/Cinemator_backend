// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { User } from './user.entity';

// Instruments
import { AuthInput } from '../Auth/auth.inputs';
import { UserUpdateInput } from './user.inputs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // ================================================================================================================

    createOne(input: AuthInput): Promise<User> {
        return this.userRepository.save(input);
    }

    // ================================================================================================================

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    // ================================================================================================================

    async findOneById(userId: string): Promise<User> {
        const user = await this.userRepository.findOne(userId);

        if (!user) {
            throw new BadRequestException('User does not exist');
        }

        return user;
    }

    // ================================================================================================================

    findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email }});
    }

    // ================================================================================================================

    async updateTokenVersion(userId: string): Promise<boolean> {
        const user = await this.findOneById(userId);

        await this.userRepository.update(userId, { tokenVersion: user.tokenVersion + 1 });

        return true;
    }

    // ================================================================================================================

    updateOneById(userId: string, input: UserUpdateInput): Promise<User> {
        return this.userRepository.save({ id: userId, ...input });
    }

    // ================================================================================================================

    async deleteOneById(userId: string): Promise<boolean> {
        try {
            await this.userRepository.delete(userId);

            return true;
        } catch (error) {
            return false;
        }
    }
}
