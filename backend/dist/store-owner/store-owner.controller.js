var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { StoreOwnerService } from './store-owner.service.js';
let StoreOwnerController = class StoreOwnerController {
    storeOwnerService;
    constructor(storeOwnerService) {
        this.storeOwnerService = storeOwnerService;
    }
    getDashboard(request) {
        return this.storeOwnerService.getDashboard(request.user.sub);
    }
};
__decorate([
    Get('dashboard'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoreOwnerController.prototype, "getDashboard", null);
StoreOwnerController = __decorate([
    Controller('store-owner'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(Role.STORE_OWNER),
    __metadata("design:paramtypes", [StoreOwnerService])
], StoreOwnerController);
export { StoreOwnerController };
//# sourceMappingURL=store-owner.controller.js.map