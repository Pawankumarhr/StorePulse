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
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../stores/entities/store.entity.js';
let StoreOwnerService = class StoreOwnerService {
    storesRepository;
    constructor(storesRepository) {
        this.storesRepository = storesRepository;
    }
    async getDashboard(ownerId) {
        const store = await this.storesRepository
            .createQueryBuilder('store')
            .leftJoinAndSelect('store.ratings', 'rating')
            .leftJoinAndSelect('rating.user', 'user')
            .where('store.owner_id = :ownerId', { ownerId })
            .getOne();
        if (!store) {
            throw new NotFoundException('Store not found for this owner');
        }
        const raters = (store.ratings ?? []).map((rating) => ({
            userId: rating.userId,
            name: rating.user.name,
            email: rating.user.email,
            rating: rating.rating,
            createdAt: rating.createdAt,
            updatedAt: rating.updatedAt,
        }));
        const averageRating = raters.length
            ? Number((raters.reduce((total, rater) => total + rater.rating, 0) / raters.length).toFixed(2))
            : 0;
        return {
            store: {
                id: store.id,
                name: store.name,
                email: store.email,
                address: store.address,
            },
            averageRating,
            totalRatings: raters.length,
            raters,
        };
    }
};
StoreOwnerService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Store)),
    __metadata("design:paramtypes", [Repository])
], StoreOwnerService);
export { StoreOwnerService };
//# sourceMappingURL=store-owner.service.js.map