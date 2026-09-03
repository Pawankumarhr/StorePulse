import { Repository } from 'typeorm';
import { Store } from './entities/store.entity.js';
import { StoreQueryDto } from './dto/store-query.dto.js';
export declare class StoresService {
    private readonly storesRepository;
    constructor(storesRepository: Repository<Store>);
    listForUser(userId: number, query: StoreQueryDto): Promise<{
        data: {
            id: number;
            name: string;
            email: string;
            address: string;
            createdAt: Date;
            averageRating: number;
            userRating: number | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
