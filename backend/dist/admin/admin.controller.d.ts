import { Role } from '../common/enums/role.enum.js';
import { AdminService } from './admin.service.js';
import { AdminQueryDto } from './dto/admin-query.dto.js';
import { CreateStoreDto } from './dto/create-store.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createUser(createUserDto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        address: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createStore(createStoreDto: CreateStoreDto): Promise<import("../stores/entities/store.entity.js").Store>;
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
}
