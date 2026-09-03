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
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity.js';
const SORT_FIELDS = {
    name: 'store.name',
    address: 'store.address',
    createdAt: 'store.created_at',
    averageRating: 'averageRating',
};
let StoresService = class StoresService {
    storesRepository;
    constructor(storesRepository) {
        this.storesRepository = storesRepository;
    }
    async listForUser(userId, query) {
        const queryBuilder = this.storesRepository
            .createQueryBuilder('store')
            .leftJoin('store.ratings', 'rating')
            .select([
            'store.id AS id',
            'store.name AS name',
            'store.email AS email',
            'store.address AS address',
            'store.created_at AS createdAt',
        ])
            .addSelect('COALESCE(AVG(rating.rating), 0)', 'averageRating')
            .addSelect('MAX(CASE WHEN rating.user_id = :userId THEN rating.rating ELSE NULL END)', 'userRating')
            .setParameter('userId', userId)
            .groupBy('store.id')
            .addGroupBy('store.name')
            .addGroupBy('store.email')
            .addGroupBy('store.address')
            .addGroupBy('store.created_at');
        if (query.name) {
            queryBuilder.andWhere('store.name LIKE :name', { name: `%${query.name}%` });
        }
        if (query.address) {
            queryBuilder.andWhere('store.address LIKE :address', { address: `%${query.address}%` });
        }
        queryBuilder
            .orderBy(SORT_FIELDS[query.sortBy], query.order)
            .skip((query.page - 1) * query.limit)
            .take(query.limit);
        const rows = await queryBuilder.getRawMany();
        const countQuery = this.storesRepository.createQueryBuilder('store');
        if (query.name)
            countQuery.andWhere('store.name LIKE :name', { name: `%${query.name}%` });
        if (query.address)
            countQuery.andWhere('store.address LIKE :address', { address: `%${query.address}%` });
        const total = await countQuery.getCount();
        return {
            data: rows.map((row) => ({
                id: Number(row.id),
                name: row.name,
                email: row.email,
                address: row.address,
                createdAt: row.createdAt,
                averageRating: Number(Number(row.averageRating).toFixed(2)),
                userRating: row.userRating === null ? null : Number(row.userRating),
            })),
            meta: {
                page: query.page,
                limit: query.limit,
                total,
                totalPages: Math.ceil(total / query.limit),
            },
        };
    }
};
StoresService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Store)),
    __metadata("design:paramtypes", [Repository])
], StoresService);
export { StoresService };
//# sourceMappingURL=stores.service.js.map