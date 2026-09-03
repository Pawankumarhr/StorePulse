import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum.js';
import { Rating } from '../ratings/entities/rating.entity.js';
import { Store } from '../stores/entities/store.entity.js';
import { User } from '../users/entities/user.entity.js';
import { AdminQueryDto } from './dto/admin-query.dto.js';
import { CreateStoreDto } from './dto/create-store.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';
export declare class AdminService {
    private readonly usersRepository;
    private readonly storesRepository;
    private readonly ratingsRepository;
    constructor(usersRepository: Repository<User>, storesRepository: Repository<Store>, ratingsRepository: Repository<Rating>);
    createUser(createUserDto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        address: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createStore(createStoreDto: CreateStoreDto): Promise<Store>;
    getDashboard(): Promise<{
        totalUsers: number;
        totalStores: number;
        totalRatings: number;
        usersByRole: {
            [k: string]: number;
        };
    }>;
    listUsers(query: AdminQueryDto): Promise<{
        data: {
            id: number;
            name: string;
            email: string;
            address: string;
            role: Role;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getUserDetail(id: number): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            address: string;
            role: Role;
            createdAt: Date;
            updatedAt: Date;
        };
        ratings: {
            id: number;
            storeId: number;
            storeName: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    listStores(query: AdminQueryDto): Promise<{
        data: {
            id: number;
            name: string;
            email: string;
            address: string;
            ownerId: number;
            owner: {
                id: number;
                name: string;
                email: string;
            } | null;
            createdAt: Date;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    private serializeUser;
    private paginationMeta;
}
