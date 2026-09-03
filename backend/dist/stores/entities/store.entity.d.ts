import type { Rating } from '../../ratings/entities/rating.entity.js';
import type { User } from '../../users/entities/user.entity.js';
export declare class Store {
    id: number;
    name: string;
    email: string;
    address: string;
    ownerId: number;
    owner: User;
    createdAt: Date;
    ratings: Rating[];
}
