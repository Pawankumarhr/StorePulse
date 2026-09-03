import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum.js';
import { User } from '../users/entities/user.entity.js';
import { AuthService } from './auth.service.js';

describe('AuthService', () => {
  const user: User = {
    id: 7,
    name: 'Normal User',
    email: 'user@example.com',
    password: '',
    address: '1 Main Street',
    role: Role.NORMAL_USER,
    createdAt: new Date(),
    updatedAt: new Date(),
    stores: [],
    ratings: [],
  };

  it('hashes a password and returns an access token during signup', async () => {
    const usersService = {
      createNormalUser: vi.fn(async (data: Pick<User, 'name' | 'email' | 'password' | 'address'>) => ({
        ...user,
        ...data,
      })),
      findByEmail: vi.fn(),
      findById: vi.fn(),
      updatePassword: vi.fn(),
    };
    const jwtService = { sign: vi.fn(() => 'signed-token') };
    const authService = new AuthService(usersService as never, jwtService as never);

    const response = await authService.signup({
      name: 'Normal User',
      email: ' USER@example.com ',
      password: 'password123',
      address: '1 Main Street',
    });

    expect(usersService.createNormalUser).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'user@example.com' }),
    );
    const savedUser = usersService.createNormalUser.mock.calls[0][0];
    expect(savedUser.password).not.toBe('password123');
    expect(await bcrypt.compare('password123', savedUser.password)).toBe(true);
    expect(response).toEqual(expect.objectContaining({ accessToken: 'signed-token' }));
    expect(response.user).not.toHaveProperty('password');
  });

  it('rejects invalid credentials', async () => {
    const usersService = {
      findByEmail: vi.fn(async () => null),
    };
    const authService = new AuthService(usersService as never, { sign: vi.fn() } as never);

    await expect(authService.validateCredentials('missing@example.com', 'password123')).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('updates the password only after verifying the current password', async () => {
    const currentPassword = 'oldpassword';
    const hashedPassword = await bcrypt.hash(currentPassword, 4);
    const storedUser = { ...user, password: hashedPassword };
    const usersService = {
      findById: vi.fn(async () => storedUser),
      updatePassword: vi.fn(),
    };
    const authService = new AuthService(usersService as never, { sign: vi.fn() } as never);

    await authService.updatePassword(7, {
      currentPassword,
      newPassword: 'newpassword123',
    });

    expect(usersService.updatePassword).toHaveBeenCalledOnce();
    const updatedPassword = usersService.updatePassword.mock.calls[0][1];
    expect(await bcrypt.compare('newpassword123', updatedPassword)).toBe(true);
  });
});