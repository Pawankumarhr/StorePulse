import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Store } from '../stores/entities/store.entity.js';
import { StoreOwnerController } from './store-owner.controller.js';
import { StoreOwnerService } from './store-owner.service.js';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Store]),
  ],
  controllers: [StoreOwnerController],
  providers: [StoreOwnerService, JwtAuthGuard, RolesGuard],
})
export class StoreOwnerModule {}
