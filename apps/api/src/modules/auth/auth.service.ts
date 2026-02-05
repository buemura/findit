import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { createId } from '@paralleldrive/cuid2';

import { AuthRepository } from './auth.repository';
import { UsersRepository } from '../users/users.repository';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private authRepository: AuthRepository,
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    this.logger.log(`Registration attempt for email: ${dto.email}`);

    const existingUser = await this.usersRepository.findByEmail(dto.email);
    if (existingUser) {
      this.logger.warn(`Registration failed: Email already exists - ${dto.email}`);
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersRepository.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
    });

    this.logger.log(`User registered successfully: ${user.id} (${user.email})`);

    const tokens = await this.generateTokens(user.id, user.email, user.isAdmin);
    return { user: this.sanitizeUser(user), ...tokens };
  }

  async login(dto: LoginDto) {
    this.logger.log(`Login attempt for email: ${dto.email}`);

    const user = await this.usersRepository.findByEmail(dto.email);
    if (!user) {
      this.logger.warn(`Login failed: User not found - ${dto.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      this.logger.warn(`Login failed: Invalid password for user ${user.id}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`User logged in successfully: ${user.id} (${user.email})`);

    const tokens = await this.generateTokens(user.id, user.email, user.isAdmin);
    return { user: this.sanitizeUser(user), ...tokens };
  }

  async refresh(dto: RefreshTokenDto) {
    this.logger.debug('Token refresh attempt');

    const storedToken = await this.authRepository.findRefreshToken(dto.refreshToken);
    if (!storedToken || storedToken.expiresAt < new Date()) {
      this.logger.warn('Token refresh failed: Invalid or expired refresh token');
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersRepository.findById(storedToken.userId);
    if (!user) {
      this.logger.warn(`Token refresh failed: User not found - ${storedToken.userId}`);
      throw new UnauthorizedException('User not found');
    }

    await this.authRepository.deleteRefreshToken(dto.refreshToken);
    const tokens = await this.generateTokens(user.id, user.email, user.isAdmin);

    this.logger.debug(`Token refreshed for user: ${user.id}`);
    return tokens;
  }

  async logout(refreshToken: string) {
    this.logger.debug('Logout request');
    await this.authRepository.deleteRefreshToken(refreshToken);
    this.logger.debug('User logged out successfully');
  }

  async getMe(userId: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      this.logger.warn(`GetMe failed: User not found - ${userId}`);
      throw new UnauthorizedException('User not found');
    }
    return this.sanitizeUser(user);
  }

  private async generateTokens(userId: string, email: string, isAdmin: boolean) {
    const payload = { sub: userId, email, isAdmin };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
    });

    const refreshToken = createId();
    const expiresIn = this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + parseInt(expiresIn));

    await this.authRepository.createRefreshToken({
      userId,
      token: refreshToken,
      expiresAt,
    });

    return { accessToken, refreshToken };
  }

  private sanitizeUser(user: { id: string; name: string; email: string; isAdmin: boolean; [key: string]: unknown }) {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }
}
