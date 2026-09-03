import { Role } from '../../common/enums/role.enum.js';
import type { Rating } from '../../ratings/entities/rating.entity.js';
import type { Store } from '../../stores/entities/store.entity.js';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    address: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    stores: Store[];
    ratings: Rating[];
}
