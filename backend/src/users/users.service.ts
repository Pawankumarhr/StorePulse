import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum.js';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async createNormalUser(data: Pick<User, 'name' | 'email' | 'password' | 'address'>): Promise<User> {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const user = this.usersRepository.create({ ...data, role: Role.NORMAL_USER });
    return this.usersRepository.save(user);
  }

  async updatePassword(user: User, password: string): Promise<void> {
    user.password = password;
    await this.usersRepository.save(user);
  }
}
