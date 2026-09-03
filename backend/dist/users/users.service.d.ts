import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    createNormalUser(data: Pick<User, 'name' | 'email' | 'password' | 'address'>): Promise<User>;
    updatePassword(user: User, password: string): Promise<void>;
}
