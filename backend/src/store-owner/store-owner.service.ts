import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../stores/entities/store.entity.js';

@Injectable()
export class StoreOwnerService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
  ) {}

  async getDashboard(ownerId: number) {
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
}
