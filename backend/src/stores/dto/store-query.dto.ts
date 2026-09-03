import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

const SORT_FIELDS = ['name', 'address', 'createdAt', 'averageRating'] as const;
const SORT_ORDERS = ['ASC', 'DESC'] as const;
export type StoreSortField = (typeof SORT_FIELDS)[number];
export type StoreSortOrder = (typeof SORT_ORDERS)[number];

export class StoreQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsIn(SORT_FIELDS)
  sortBy: StoreSortField = 'createdAt';

  @IsOptional()
  @IsIn(SORT_ORDERS)
  order: StoreSortOrder = 'DESC';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20;
}
