import { Request } from 'express';
import { RatingsService } from './ratings.service.js';
import { SubmitRatingDto } from './dto/submit-rating.dto.js';
interface AuthenticatedRequest extends Request {
    user: {
        sub: number;
    };
}
export declare class RatingsController {
    private readonly ratingsService;
    constructor(ratingsService: RatingsService);
    submit(request: AuthenticatedRequest, storeId: number, submitRatingDto: SubmitRatingDto): Promise<{
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
    update(request: AuthenticatedRequest, storeId: number, submitRatingDto: SubmitRatingDto): Promise<{
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
export {};
