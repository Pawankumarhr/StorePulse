var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn, } from 'typeorm';
let Rating = class Rating {
    id;
    userId;
    storeId;
    rating;
    createdAt;
    updatedAt;
    user;
    store;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Rating.prototype, "id", void 0);
__decorate([
    Column({ name: 'user_id' }),
    __metadata("design:type", Number)
], Rating.prototype, "userId", void 0);
__decorate([
    Column({ name: 'store_id' }),
    __metadata("design:type", Number)
], Rating.prototype, "storeId", void 0);
__decorate([
    Column({ type: 'tinyint', unsigned: true }),
    __metadata("design:type", Number)
], Rating.prototype, "rating", void 0);
__decorate([
    CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], Rating.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Rating.prototype, "updatedAt", void 0);
__decorate([
    ManyToOne('User', (user) => user.ratings, { nullable: false }),
    JoinColumn({ name: 'user_id' }),
    __metadata("design:type", Function)
], Rating.prototype, "user", void 0);
__decorate([
    ManyToOne('Store', (store) => store.ratings, { nullable: false }),
    JoinColumn({ name: 'store_id' }),
    __metadata("design:type", Function)
], Rating.prototype, "store", void 0);
Rating = __decorate([
    Entity('ratings'),
    Unique('UQ_ratings_user_store', ['userId', 'storeId'])
], Rating);
export { Rating };
//# sourceMappingURL=rating.entity.js.map