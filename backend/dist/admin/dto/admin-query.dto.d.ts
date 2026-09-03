export declare const SORT_ORDERS: readonly ["ASC", "DESC"];
export type SortOrder = (typeof SORT_ORDERS)[number];
export declare class AdminQueryDto {
    name?: string;
    email?: string;
    address?: string;
    role?: string;
    sortBy?: string;
    order?: SortOrder;
    page: number;
    limit: number;
}
