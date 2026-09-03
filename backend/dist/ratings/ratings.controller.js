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
import { Body, Controller, Param, ParseIntPipe, Patch, Post, Req, UseGuards, } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../common/enums/role.enum.js';
import { RatingsService } from './ratings.service.js';
import { SubmitRatingDto } from './dto/submit-rating.dto.js';
let RatingsController = class RatingsController {
    ratingsService;
    constructor(ratingsService) {
        this.ratingsService = ratingsService;
    }
    submit(request, storeId, submitRatingDto) {
        return this.ratingsService.submitOrUpdate(request.user.sub, storeId, submitRatingDto);
    }
    update(request, storeId, submitRatingDto) {
        return this.ratingsService.submitOrUpdate(request.user.sub, storeId, submitRatingDto);
    }
};
__decorate([
    Post(),
    __param(0, Req()),
    __param(1, Param('storeId', ParseIntPipe)),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, SubmitRatingDto]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "submit", null);
__decorate([
    Patch(),
    __param(0, Req()),
    __param(1, Param('storeId', ParseIntPipe)),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, SubmitRatingDto]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "update", null);
RatingsController = __decorate([
    Controller('stores/:storeId/ratings'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(Role.NORMAL_USER),
    __metadata("design:paramtypes", [RatingsService])
], RatingsController);
export { RatingsController };
//# sourceMappingURL=ratings.controller.js.map