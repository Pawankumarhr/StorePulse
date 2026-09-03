import type { Store } from '../../stores/entities/store.entity.js';
import type { User } from '../../users/entities/user.entity.js';
export declare class Rating {
    id: number;
    userId: number;
    storeId: number;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    store: Store;
}
