import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { StoreOwnerService } from './store-owner.service.js';

interface AuthenticatedRequest extends Request {
  user: { sub: number };
}

@Controller('store-owner')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.STORE_OWNER)
export class StoreOwnerController {
  constructor(private readonly storeOwnerService: StoreOwnerService) {}

  @Get('dashboard')
  getDashboard(@Req() request: AuthenticatedRequest) {
    return this.storeOwnerService.getDashboard(request.user.sub);
  }
}
