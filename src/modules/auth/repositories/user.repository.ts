import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequestDto } from '../dto/create-user-request.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async createUser(dto: CreateUserRequestDto) {
    const user = this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }
}
