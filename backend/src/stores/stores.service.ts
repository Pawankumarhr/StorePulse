import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity.js';
import { StoreQueryDto } from './dto/store-query.dto.js';

const SORT_FIELDS: Record<string, string> = {
  name: 'store.name',
  address: 'store.address',
  createdAt: 'store.created_at',
  averageRating: 'averageRating',
};

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
  ) {}

  async listForUser(userId: number, query: StoreQueryDto) {
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
      .addSelect(
        'MAX(CASE WHEN rating.user_id = :userId THEN rating.rating ELSE NULL END)',
        'userRating',
      )
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

    const rows = await queryBuilder.getRawMany<{
      id: number;
      name: string;
      email: string;
      address: string;
      createdAt: Date;
      averageRating: string;
      userRating: number | null;
    }>();

    const countQuery = this.storesRepository.createQueryBuilder('store');
    if (query.name) countQuery.andWhere('store.name LIKE :name', { name: `%${query.name}%` });
    if (query.address) countQuery.andWhere('store.address LIKE :address', { address: `%${query.address}%` });
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
}
