import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../common/enums/role.enum.js';
import { AdminService } from './admin.service.js';
import { AdminQueryDto } from './dto/admin-query.dto.js';
import { CreateStoreDto } from './dto/create-store.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('users')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.adminService.createUser(createUserDto);
  }

  @Post('stores')
  createStore(@Body() createStoreDto: CreateStoreDto) {
    return this.adminService.createStore(createStoreDto);
  }

  @Get('dashboard')
  getDashboard() {
    return this.adminService.getDashboard();
  }

  @Get('users')
  listUsers(@Query() query: AdminQueryDto) {
    return this.adminService.listUsers(query);
  }

  @Get('users/:id')
  getUserDetail(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getUserDetail(id);
  }

  @Get('stores')
  listStores(@Query() query: AdminQueryDto) {
    return this.adminService.listStores(query);
  }
}
