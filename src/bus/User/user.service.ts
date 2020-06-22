// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Instruments
import { User } from './user.entity';
import { AuthInput } from '../Auth/auth.inputs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    createOne(input: AuthInput): Promise<User> {
        return this.userRepository.save(input);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new BadRequestException('User does not exist');
        }

        return user;
    }

    findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email }});
    }

    updateOne(input: User): Promise<User> {
        return this.userRepository.save(input);
    }
}
