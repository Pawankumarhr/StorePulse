var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { Role } from '../../common/enums/role.enum.js';
let User = class User {
    id;
    name;
    email;
    password;
    address;
    role;
    createdAt;
    updatedAt;
    stores;
    ratings;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column({ length: 60 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column({ length: 255, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ length: 255 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({ length: 400 }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    Column({ type: 'enum', enum: Role, default: Role.NORMAL_USER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    OneToMany('Store', (store) => store.owner),
    __metadata("design:type", Array)
], User.prototype, "stores", void 0);
__decorate([
    OneToMany('Rating', (rating) => rating.user),
    __metadata("design:type", Array)
], User.prototype, "ratings", void 0);
User = __decorate([
    Entity('users'),
    Index('IDX_users_role', ['role'])
], User);
export { User };
//# sourceMappingURL=user.entity.js.map