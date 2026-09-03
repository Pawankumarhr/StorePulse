import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../common/enums/role.enum.js';
import { StoreQueryDto } from './dto/store-query.dto.js';
import { StoresService } from './stores.service.js';

interface AuthenticatedRequest extends Request {
  user: { sub: number };
}

@Controller('stores')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.NORMAL_USER)
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  list(@Req() request: AuthenticatedRequest, @Query() query: StoreQueryDto) {
    return this.storesService.listForUser(request.user.sub, query);
  }
}
