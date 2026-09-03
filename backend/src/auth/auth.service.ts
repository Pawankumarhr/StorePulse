import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity.js';
import { UsersService } from '../users/users.service.js';
import { LoginDto } from './dto/login.dto.js';
import { SignupDto } from './dto/signup.dto.js';
import { UpdatePasswordDto } from './dto/update-password.dto.js';

export interface JwtPayload {
  sub: number;
  email: string;
  role: User['role'];
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const password = await bcrypt.hash(signupDto.password, 12);
    const user = await this.usersService.createNormalUser({
      ...signupDto,
      email: this.normalizeEmail(signupDto.email),
      password,
    });

    return this.toAuthResponse(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateCredentials(loginDto.email, loginDto.password);
    return this.toAuthResponse(user);
  }

  async updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto): Promise<void> {
    const user = await this.usersService.findById(userId);
    if (!user || !(await bcrypt.compare(updatePasswordDto.currentPassword, user.password))) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const password = await bcrypt.hash(updatePasswordDto.newPassword, 12);
    await this.usersService.updatePassword(user, password);
  }

  async validateCredentials(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(this.normalizeEmail(email));
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  private toAuthResponse(user: User) {
    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
    };
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }
}
