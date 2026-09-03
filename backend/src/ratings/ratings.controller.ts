import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../common/enums/role.enum.js';
import { RatingsService } from './ratings.service.js';
import { SubmitRatingDto } from './dto/submit-rating.dto.js';

interface AuthenticatedRequest extends Request {
  user: { sub: number };
}

@Controller('stores/:storeId/ratings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.NORMAL_USER)
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  submit(
    @Req() request: AuthenticatedRequest,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Body() submitRatingDto: SubmitRatingDto,
  ) {
    return this.ratingsService.submitOrUpdate(request.user.sub, storeId, submitRatingDto);
  }

  @Patch()
  update(
    @Req() request: AuthenticatedRequest,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Body() submitRatingDto: SubmitRatingDto,
  ) {
    return this.ratingsService.submitOrUpdate(request.user.sub, storeId, submitRatingDto);
  }
}
