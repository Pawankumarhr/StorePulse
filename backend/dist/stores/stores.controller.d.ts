import { Request } from 'express';
import { StoreQueryDto } from './dto/store-query.dto.js';
import { StoresService } from './stores.service.js';
interface AuthenticatedRequest extends Request {
    user: {
        sub: number;
    };
}
export declare class StoresController {
    private readonly storesService;
    constructor(storesService: StoresService);
    list(request: AuthenticatedRequest, query: StoreQueryDto): Promise<{
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
export {};
