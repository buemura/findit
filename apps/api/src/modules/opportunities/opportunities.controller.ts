import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto, UpdateOpportunityDto, FilterOpportunityDto } from './dto';
import { Public } from '@/common/decorators/public.decorator';
import { CurrentUser, JwtPayload } from '@/common/decorators/current-user.decorator';

@ApiTags('Opportunities')
@Controller('opportunities')
export class OpportunitiesController {
  constructor(private opportunitiesService: OpportunitiesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all opportunities with filters' })
  async findAll(@Query() filters: FilterOpportunityDto) {
    return this.opportunitiesService.findAll(filters);
  }

  @Public()
  @Get('count')
  @ApiOperation({ summary: 'Get total opportunities count' })
  async count(@Query() filters: FilterOpportunityDto) {
    const count = await this.opportunitiesService.count(filters);
    return { count };
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get opportunity by ID' })
  async findById(@Param('id') id: string) {
    return this.opportunitiesService.findById(id);
  }

  @Get('user/me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user opportunities' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  async findMyOpportunities(
    @CurrentUser() user: JwtPayload,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.opportunitiesService.findByUserId(user.sub, limit, offset);
  }

  @Public()
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get opportunities by user ID' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  async findByUserId(
    @Param('userId') userId: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.opportunitiesService.findByUserId(userId, limit, offset);
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create new opportunity' })
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateOpportunityDto,
  ) {
    return this.opportunitiesService.create(user.sub, dto);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update opportunity' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateOpportunityDto,
  ) {
    return this.opportunitiesService.update(id, user.sub, user.isAdmin, dto);
  }

  @Patch(':id/complete')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Mark opportunity as completed' })
  async markCompleted(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body('completedByUserId') completedByUserId: string,
  ) {
    return this.opportunitiesService.markCompleted(id, user.sub, completedByUserId);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete opportunity (soft delete)' })
  async delete(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    await this.opportunitiesService.delete(id, user.sub, user.isAdmin);
    return { message: 'Opportunity deleted successfully' };
  }
}
