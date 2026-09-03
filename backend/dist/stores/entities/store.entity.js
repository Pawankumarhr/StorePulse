var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
let Store = class Store {
    id;
    name;
    email;
    address;
    ownerId;
    owner;
    createdAt;
    ratings;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Store.prototype, "id", void 0);
__decorate([
    Column({ length: 60 }),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    Column({ length: 255 }),
    __metadata("design:type", String)
], Store.prototype, "email", void 0);
__decorate([
    Column({ length: 400 }),
    __metadata("design:type", String)
], Store.prototype, "address", void 0);
__decorate([
    Column({ name: 'owner_id' }),
    __metadata("design:type", Number)
], Store.prototype, "ownerId", void 0);
__decorate([
    ManyToOne('User', (user) => user.stores, { nullable: false }),
    JoinColumn({ name: 'owner_id' }),
    __metadata("design:type", Function)
], Store.prototype, "owner", void 0);
__decorate([
    CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], Store.prototype, "createdAt", void 0);
__decorate([
    OneToMany('Rating', (rating) => rating.store),
    __metadata("design:type", Array)
], Store.prototype, "ratings", void 0);
Store = __decorate([
    Entity('stores'),
    Index('IDX_stores_owner_id', ['ownerId']),
    Index('UQ_stores_owner_id', ['ownerId'], { unique: true })
], Store);
export { Store };
//# sourceMappingURL=store.entity.js.map