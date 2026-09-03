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
import { Rating } from './entities/rating.entity.js';
let RatingsService = class RatingsService {
    ratingsRepository;
    storesRepository;
    constructor(ratingsRepository, storesRepository) {
        this.ratingsRepository = ratingsRepository;
        this.storesRepository = storesRepository;
    }
    async submitOrUpdate(userId, storeId, submitRatingDto) {
        const store = await this.storesRepository.findOne({ where: { id: storeId } });
        if (!store) {
            throw new NotFoundException('Store not found');
        }
        let rating = await this.ratingsRepository.findOne({ where: { userId, storeId } });
        const action = rating ? 'updated' : 'created';
        if (rating) {
            rating.rating = submitRatingDto.rating;
        }
        else {
            rating = this.ratingsRepository.create({
                userId,
                storeId,
                rating: submitRatingDto.rating,
            });
        }
        const savedRating = await this.ratingsRepository.save(rating);
        return {
            message: `Rating ${action} successfully`,
            rating: {
                id: savedRating.id,
                userId: savedRating.userId,
                storeId: savedRating.storeId,
                rating: savedRating.rating,
                createdAt: savedRating.createdAt,
                updatedAt: savedRating.updatedAt,
            },
        };
    }
};
RatingsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Rating)),
    __param(1, InjectRepository(Store)),
    __metadata("design:paramtypes", [Repository,
        Repository])
], RatingsService);
export { RatingsService };
//# sourceMappingURL=ratings.service.js.map