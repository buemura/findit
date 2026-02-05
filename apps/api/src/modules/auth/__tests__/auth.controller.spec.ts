import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  const mockUser = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    isAdmin: false,
  };

  const mockTokens = {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            refresh: jest.fn(),
            logout: jest.fn(),
            getMe: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get(AuthService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const dto = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
      service.register.mockResolvedValue({ user: mockUser, ...mockTokens });

      const result = await controller.register(dto);

      expect(result).toEqual({ user: mockUser, ...mockTokens });
      expect(service.register).toHaveBeenCalledWith(dto);
    });
  });

  describe('login', () => {
    it('should login user and return tokens', async () => {
      const dto = { email: 'john@example.com', password: 'password123' };
      service.login.mockResolvedValue({ user: mockUser, ...mockTokens });

      const result = await controller.login(dto);

      expect(result).toEqual({ user: mockUser, ...mockTokens });
      expect(service.login).toHaveBeenCalledWith(dto);
    });
  });

  describe('refresh', () => {
    it('should refresh tokens', async () => {
      const dto = { refreshToken: 'old-refresh-token' };
      service.refresh.mockResolvedValue(mockTokens);

      const result = await controller.refresh(dto);

      expect(result).toEqual(mockTokens);
      expect(service.refresh).toHaveBeenCalledWith(dto);
    });
  });

  describe('logout', () => {
    it('should logout user', async () => {
      const dto = { refreshToken: 'refresh-token' };
      service.logout.mockResolvedValue(undefined);

      const result = await controller.logout(dto);

      expect(result).toEqual({ message: 'Logged out successfully' });
      expect(service.logout).toHaveBeenCalledWith(dto.refreshToken);
    });
  });

  describe('getMe', () => {
    it('should return current user', async () => {
      const jwtPayload = { sub: 'user-1', email: 'john@example.com', isAdmin: false };
      service.getMe.mockResolvedValue(mockUser);

      const result = await controller.getMe(jwtPayload);

      expect(result).toEqual(mockUser);
      expect(service.getMe).toHaveBeenCalledWith('user-1');
    });
  });
});
