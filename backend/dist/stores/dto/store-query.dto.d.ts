declare const SORT_FIELDS: readonly ["name", "address", "createdAt", "averageRating"];
declare const SORT_ORDERS: readonly ["ASC", "DESC"];
export type StoreSortField = (typeof SORT_FIELDS)[number];
export type StoreSortOrder = (typeof SORT_ORDERS)[number];
export declare class StoreQueryDto {
    name?: string;
    address?: string;
    sortBy: StoreSortField;
    order: StoreSortOrder;
    page: number;
    limit: number;
}
export {};
