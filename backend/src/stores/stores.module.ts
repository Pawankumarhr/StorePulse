import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Store } from './entities/store.entity.js';
import { StoresController } from './stores.controller.js';
import { StoresService } from './stores.service.js';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), TypeOrmModule.forFeature([Store])],
  controllers: [StoresController],
  providers: [StoresService, JwtAuthGuard, RolesGuard],
  exports: [StoresService],
})
export class StoresModule {}
