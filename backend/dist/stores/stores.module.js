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
import { Store } from './entities/store.entity.js';
import { StoresController } from './stores.controller.js';
import { StoresService } from './stores.service.js';
let StoresModule = class StoresModule {
};
StoresModule = __decorate([
    Module({
        imports: [PassportModule.register({ defaultStrategy: 'jwt' }), TypeOrmModule.forFeature([Store])],
        controllers: [StoresController],
        providers: [StoresService, JwtAuthGuard, RolesGuard],
        exports: [StoresService],
    })
], StoresModule);
export { StoresModule };
//# sourceMappingURL=stores.module.js.map