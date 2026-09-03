var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum.js';
import { Rating } from '../ratings/entities/rating.entity.js';
import { Store } from '../stores/entities/store.entity.js';
import { User } from '../users/entities/user.entity.js';
const USER_SORT_FIELDS = {
    id: 'user.id',
    name: 'user.name',
    email: 'user.email',
    address: 'user.address',
    role: 'user.role',
    createdAt: 'user.created_at',
};
const STORE_SORT_FIELDS = {
    id: 'store.id',
    name: 'store.name',
    email: 'store.email',
    address: 'store.address',
    createdAt: 'store.created_at',
};
let AdminService = class AdminService {
    usersRepository;
    storesRepository;
    ratingsRepository;
    constructor(usersRepository, storesRepository, ratingsRepository) {
        this.usersRepository = usersRepository;
        this.storesRepository = storesRepository;
        this.ratingsRepository = ratingsRepository;
    }
    async createUser(createUserDto) {
        const email = createUserDto.email.trim().toLowerCase();
        const existingUser = await this.usersRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email is already registered');
        }
        const user = this.usersRepository.create({
            ...createUserDto,
            email,
            password: await bcrypt.hash(createUserDto.password, 12),
        });
        const savedUser = await this.usersRepository.save(user);
        return this.serializeUser(savedUser);
    }
    async createStore(createStoreDto) {
        const owner = await this.usersRepository.findOne({ where: { id: createStoreDto.ownerId } });
        if (!owner) {
            throw new NotFoundException('Store owner not found');
        }
        if (owner.role !== Role.STORE_OWNER) {
            throw new UnprocessableEntityException('Store owner must have the STORE_OWNER role');
        }
        const existingStore = await this.storesRepository.findOne({ where: { ownerId: owner.id } });
        if (existingStore) {
            throw new ConflictException('Store owner already has a store');
        }
        const store = this.storesRepository.create({
            ...createStoreDto,
            email: createStoreDto.email.trim().toLowerCase(),
            owner,
        });
        return this.storesRepository.save(store);
    }
    async getDashboard() {
        const [totalUsers, totalStores, totalRatings, usersByRole] = await Promise.all([
            this.usersRepository.count(),
            this.storesRepository.count(),
            this.ratingsRepository.count(),
            this.usersRepository
                .createQueryBuilder('user')
                .select('user.role', 'role')
                .addSelect('COUNT(user.id)', 'count')
                .groupBy('user.role')
                .getRawMany(),
        ]);
        return {
            totalUsers,
            totalStores,
            totalRatings,
            usersByRole: Object.fromEntries(usersByRole.map(({ role, count }) => [role, Number(count)])),
        };
    }
    async listUsers(query) {
        const queryBuilder = this.usersRepository.createQueryBuilder('user');
        if (query.name)
            queryBuilder.andWhere('user.name LIKE :name', { name: `%${query.name}%` });
        if (query.email)
            queryBuilder.andWhere('user.email LIKE :email', { email: `%${query.email}%` });
        if (query.address)
            queryBuilder.andWhere('user.address LIKE :address', { address: `%${query.address}%` });
        if (query.role)
            queryBuilder.andWhere('user.role = :role', { role: query.role });
        const sortField = USER_SORT_FIELDS[query.sortBy ?? 'createdAt'];
        queryBuilder.orderBy(sortField, query.order ?? 'DESC');
        queryBuilder.skip((query.page - 1) * query.limit).take(query.limit);
        const [users, total] = await queryBuilder.getManyAndCount();
        return {
            data: users.map((user) => this.serializeUser(user)),
            meta: this.paginationMeta(total, query),
        };
    }
    async getUserDetail(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const ratings = await this.ratingsRepository.find({
            where: { userId: id },
            relations: { store: true },
            order: { createdAt: 'DESC' },
        });
        return {
            user: this.serializeUser(user),
            ratings: ratings.map((rating) => ({
                id: rating.id,
                storeId: rating.storeId,
                storeName: rating.store.name,
                rating: rating.rating,
                createdAt: rating.createdAt,
                updatedAt: rating.updatedAt,
            })),
        };
    }
    async listStores(query) {
        const queryBuilder = this.storesRepository
            .createQueryBuilder('store')
            .leftJoinAndSelect('store.owner', 'owner');
        if (query.name)
            queryBuilder.andWhere('store.name LIKE :name', { name: `%${query.name}%` });
        if (query.email)
            queryBuilder.andWhere('store.email LIKE :email', { email: `%${query.email}%` });
        if (query.address)
            queryBuilder.andWhere('store.address LIKE :address', { address: `%${query.address}%` });
        const sortField = STORE_SORT_FIELDS[query.sortBy ?? 'createdAt'];
        queryBuilder.orderBy(sortField, query.order ?? 'DESC');
        queryBuilder.skip((query.page - 1) * query.limit).take(query.limit);
        const [stores, total] = await queryBuilder.getManyAndCount();
        return {
            data: stores.map((store) => ({
                id: store.id,
                name: store.name,
                email: store.email,
                address: store.address,
                ownerId: store.ownerId,
                owner: store.owner
                    ? { id: store.owner.id, name: store.owner.name, email: store.owner.email }
                    : null,
                createdAt: store.createdAt,
            })),
            meta: this.paginationMeta(total, query),
        };
    }
    serializeUser(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    paginationMeta(total, query) {
        return {
            page: query.page,
            limit: query.limit,
            total,
            totalPages: Math.ceil(total / query.limit),
        };
    }
};
AdminService = __decorate([
    Injectable(),
    __param(0, InjectRepository(User)),
    __param(1, InjectRepository(Store)),
    __param(2, InjectRepository(Rating)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository])
], AdminService);
export { AdminService };
//# sourceMappingURL=admin.service.js.map