import { Repository } from 'typeorm';
import { Store } from '../stores/entities/store.entity.js';
import { SubmitRatingDto } from './dto/submit-rating.dto.js';
import { Rating } from './entities/rating.entity.js';
export declare class RatingsService {
    private readonly ratingsRepository;
    private readonly storesRepository;
    constructor(ratingsRepository: Repository<Rating>, storesRepository: Repository<Store>);
    submitOrUpdate(userId: number, storeId: number, submitRatingDto: SubmitRatingDto): Promise<{
        message: string;
        rating: {
            id: number;
            userId: number;
            storeId: number;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
