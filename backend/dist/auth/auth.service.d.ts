import { JwtService } from '@nestjs/jwt';
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
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signup(signupDto: SignupDto): Promise<{
        accessToken: string;
        user: {
            id: number;
            name: string;
            email: string;
            address: string;
            role: import("../common/enums/role.enum.js").Role;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: number;
            name: string;
            email: string;
            address: string;
            role: import("../common/enums/role.enum.js").Role;
        };
    }>;
    updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto): Promise<void>;
    validateCredentials(email: string, password: string): Promise<User>;
    private toAuthResponse;
    private normalizeEmail;
}
