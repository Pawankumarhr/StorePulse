import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { SignupDto } from './dto/signup.dto.js';
import { UpdatePasswordDto } from './dto/update-password.dto.js';

interface AuthenticatedRequest extends Request {
  user: { sub: number };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-password')
  async updatePassword(
    @Req() request: AuthenticatedRequest,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    await this.authService.updatePassword(request.user.sub, updatePasswordDto);
    return { message: 'Password updated successfully' };
  }
}
