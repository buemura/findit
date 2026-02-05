import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { PortfolioService } from './portfolio.service';
import { CreatePortfolioItemDto, UpdatePortfolioItemDto } from './dto';
import { Public } from '@/common/decorators/public.decorator';
import { CurrentUser, JwtPayload } from '@/common/decorators/current-user.decorator';

@ApiTags('Portfolio')
@Controller()
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Public()
  @Get('users/:userId/portfolio')
  @ApiOperation({ summary: 'Get user portfolio items' })
  async findByUserId(@Param('userId') userId: string) {
    return this.portfolioService.findByUserId(userId);
  }

  @Post('portfolio')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create portfolio item' })
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreatePortfolioItemDto,
  ) {
    return this.portfolioService.create(user.sub, dto);
  }

  @Patch('portfolio/:id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update portfolio item' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdatePortfolioItemDto,
  ) {
    return this.portfolioService.update(id, user.sub, dto);
  }

  @Delete('portfolio/:id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete portfolio item (soft delete)' })
  async delete(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    await this.portfolioService.delete(id, user.sub);
    return { message: 'Portfolio item deleted successfully' };
  }
}
