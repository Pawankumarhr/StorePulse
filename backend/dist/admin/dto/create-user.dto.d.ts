import { Role } from '../../common/enums/role.enum.js';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    address: string;
    role: Role;
}
