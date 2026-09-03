import { Request } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { SignupDto } from './dto/signup.dto.js';
import { UpdatePasswordDto } from './dto/update-password.dto.js';
interface AuthenticatedRequest extends Request {
    user: {
        sub: number;
    };
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    updatePassword(request: AuthenticatedRequest, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
}
export {};
