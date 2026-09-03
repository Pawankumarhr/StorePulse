var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
const SORT_FIELDS = ['name', 'address', 'createdAt', 'averageRating'];
const SORT_ORDERS = ['ASC', 'DESC'];
export class StoreQueryDto {
    name;
    address;
    sortBy = 'createdAt';
    order = 'DESC';
    page = 1;
    limit = 20;
}
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], StoreQueryDto.prototype, "name", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], StoreQueryDto.prototype, "address", void 0);
__decorate([
    IsOptional(),
    IsIn(SORT_FIELDS),
    __metadata("design:type", String)
], StoreQueryDto.prototype, "sortBy", void 0);
__decorate([
    IsOptional(),
    IsIn(SORT_ORDERS),
    __metadata("design:type", String)
], StoreQueryDto.prototype, "order", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Object)
], StoreQueryDto.prototype, "page", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    Max(100),
    __metadata("design:type", Object)
], StoreQueryDto.prototype, "limit", void 0);
//# sourceMappingURL=store-query.dto.js.map