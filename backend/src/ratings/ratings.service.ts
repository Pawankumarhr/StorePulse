import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../stores/entities/store.entity.js';
import { SubmitRatingDto } from './dto/submit-rating.dto.js';
import { Rating } from './entities/rating.entity.js';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
  ) {}

  async submitOrUpdate(userId: number, storeId: number, submitRatingDto: SubmitRatingDto) {
    const store = await this.storesRepository.findOne({ where: { id: storeId } });
    if (!store) {
      throw new NotFoundException('Store not found');
    }

    let rating = await this.ratingsRepository.findOne({ where: { userId, storeId } });
    const action = rating ? 'updated' : 'created';
    if (rating) {
      rating.rating = submitRatingDto.rating;
    } else {
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
}
