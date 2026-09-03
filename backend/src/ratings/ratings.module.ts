import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Rating } from './entities/rating.entity.js';
import { RatingsController } from './ratings.controller.js';
import { RatingsService } from './ratings.service.js';
import { Store } from '../stores/entities/store.entity.js';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Rating, Store]),
  ],
  controllers: [RatingsController],
  providers: [RatingsService, JwtAuthGuard, RolesGuard],
})
export class RatingsModule {}
