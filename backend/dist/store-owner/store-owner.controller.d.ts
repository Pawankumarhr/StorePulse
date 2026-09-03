import { Request } from 'express';
import { StoreOwnerService } from './store-owner.service.js';
interface AuthenticatedRequest extends Request {
    user: {
        sub: number;
    };
}
export declare class StoreOwnerController {
    private readonly storeOwnerService;
    constructor(storeOwnerService: StoreOwnerService);
    getDashboard(request: AuthenticatedRequest): Promise<{
        store: {
            id: number;
            name: string;
            email: string;
            address: string;
        };
        averageRating: number;
        totalRatings: number;
        raters: {
            userId: number;
            name: string;
            email: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
export {};
