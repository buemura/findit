import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from '../auth.service';
import { AuthRepository } from '../auth.repository';
import { UsersRepository } from '../../users/users.repository';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: jest.Mocked<AuthRepository>;
  let usersRepository: jest.Mocked<UsersRepository>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    passwordHash: 'hashed-password',
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: {
            createRefreshToken: jest.fn(),
            findRefreshToken: jest.fn(),
            deleteRefreshToken: jest.fn(),
          },
        },
        {
          provide: UsersRepository,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock-token'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              const config: Record<string, string> = {
                JWT_SECRET: 'secret',
                JWT_EXPIRES_IN: '15m',
                JWT_REFRESH_EXPIRES_IN: '7d',
              };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get(AuthRepository);
    usersRepository = module.get(UsersRepository);
    jwtService = module.get(JwtService);
  });

  describe('register', () => {
    it('should create a new user and return tokens', async () => {
      usersRepository.findByEmail.mockResolvedValue(null);
      usersRepository.create.mockResolvedValue(mockUser as any);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      authRepository.createRefreshToken.mockResolvedValue({} as any);

      const result = await service.register({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user).not.toHaveProperty('passwordHash');
      expect(usersRepository.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if email exists', async () => {
      usersRepository.findByEmail.mockResolvedValue(mockUser as any);

      await expect(
        service.register({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should return tokens for valid credentials', async () => {
      usersRepository.findByEmail.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      authRepository.createRefreshToken.mockResolvedValue({} as any);

      const result = await service.login({
        email: 'john@example.com',
        password: 'password123',
      });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    it('should throw UnauthorizedException for invalid email', async () => {
      usersRepository.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'invalid@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      usersRepository.findByEmail.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login({
          email: 'john@example.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refresh', () => {
    it('should return new tokens for valid refresh token', async () => {
      authRepository.findRefreshToken.mockResolvedValue({
        userId: 'user-1',
        token: 'valid-token',
        expiresAt: new Date(Date.now() + 86400000),
      } as any);
      usersRepository.findById.mockResolvedValue(mockUser as any);
      authRepository.createRefreshToken.mockResolvedValue({} as any);

      const result = await service.refresh({ refreshToken: 'valid-token' });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(authRepository.deleteRefreshToken).toHaveBeenCalledWith('valid-token');
    });

    it('should throw UnauthorizedException for expired token', async () => {
      authRepository.findRefreshToken.mockResolvedValue({
        userId: 'user-1',
        token: 'expired-token',
        expiresAt: new Date(Date.now() - 86400000),
      } as any);

      await expect(
        service.refresh({ refreshToken: 'expired-token' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
