import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { PassportModule } from '@nestjs/passport';
import { Rating } from '../ratings/entities/rating.entity.js';
import { Store } from '../stores/entities/store.entity.js';
import { User } from '../users/entities/user.entity.js';
import { AdminController } from './admin.controller.js';
import { AdminService } from './admin.service.js';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), TypeOrmModule.forFeature([User, Store, Rating])],
  controllers: [AdminController],
  providers: [AdminService, JwtAuthGuard, RolesGuard],
})
export class AdminModule {}
