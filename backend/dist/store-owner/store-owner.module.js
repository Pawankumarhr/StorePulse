var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Store } from '../stores/entities/store.entity.js';
import { StoreOwnerController } from './store-owner.controller.js';
import { StoreOwnerService } from './store-owner.service.js';
let StoreOwnerModule = class StoreOwnerModule {
};
StoreOwnerModule = __decorate([
    Module({
        imports: [
            PassportModule.register({ defaultStrategy: 'jwt' }),
            TypeOrmModule.forFeature([Store]),
        ],
        controllers: [StoreOwnerController],
        providers: [StoreOwnerService, JwtAuthGuard, RolesGuard],
    })
], StoreOwnerModule);
export { StoreOwnerModule };
//# sourceMappingURL=store-owner.module.js.map