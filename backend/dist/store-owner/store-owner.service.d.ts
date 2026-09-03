import { Repository } from 'typeorm';
import { Store } from '../stores/entities/store.entity.js';
export declare class StoreOwnerService {
    private readonly storesRepository;
    constructor(storesRepository: Repository<Store>);
    getDashboard(ownerId: number): Promise<{
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
