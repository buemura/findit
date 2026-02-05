import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  Post,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { CurrentUser, JwtPayload } from '@/common/decorators/current-user.decorator';
import { Public } from '@/common/decorators/public.decorator';
import { FileUploadService } from '@/infrastructure/storage/file-upload.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private fileUploadService: FileUploadService,
  ) {}

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  async findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.usersService.findAll(limit, offset);
  }

  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user profile' })
  async getMe(@CurrentUser() user: JwtPayload) {
    return this.usersService.findById(user.sub);
  }

  @Patch('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateMe(@CurrentUser() user: JwtPayload, @Body() dto: UpdateUserDto) {
    return this.usersService.update(user.sub, dto);
  }

  @Post('me/photo')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Upload profile photo' })
  async uploadPhoto(@CurrentUser() user: JwtPayload) {
    // File is handled by Fastify multipart - this is a placeholder
    // Real implementation would extract file from request
    return { message: 'Photo upload endpoint - use multipart/form-data' };
  }

  @Delete('me/photo')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Remove profile photo' })
  async removePhoto(@CurrentUser() user: JwtPayload) {
    return this.usersService.updatePhoto(user.sub, '');
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Public()
  @Get(':id/stats')
  @ApiOperation({ summary: 'Get user statistics' })
  async getStats(@Param('id') id: string) {
    return this.usersService.getStats(id);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete user account' })
  async delete(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    if (user.sub !== id && !user.isAdmin) {
      throw new ForbiddenException('Cannot delete other users');
    }
    await this.usersService.delete(id);
    return { message: 'User deleted successfully' };
  }
}
