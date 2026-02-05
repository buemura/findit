import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { OpportunitiesRepository } from './opportunities.repository';
import { CreateOpportunityDto, UpdateOpportunityDto, FilterOpportunityDto } from './dto';

@Injectable()
export class OpportunitiesService {
  constructor(private opportunitiesRepository: OpportunitiesRepository) {}

  async create(userId: string, dto: CreateOpportunityDto) {
    return this.opportunitiesRepository.create(userId, dto);
  }

  async findAll(filters: FilterOpportunityDto) {
    return this.opportunitiesRepository.findAll(filters);
  }

  async findById(id: string) {
    const result = await this.opportunitiesRepository.findById(id);
    if (!result) {
      throw new NotFoundException('Opportunity not found');
    }
    return result;
  }

  async findByUserId(userId: string, limit?: number, offset?: number) {
    return this.opportunitiesRepository.findByUserId(userId, limit, offset);
  }

  async update(id: string, userId: string, isAdmin: boolean, dto: UpdateOpportunityDto) {
    const opportunity = await this.opportunitiesRepository.findById(id);
    if (!opportunity) {
      throw new NotFoundException('Opportunity not found');
    }

    if (opportunity.opportunity.userId !== userId && !isAdmin) {
      throw new ForbiddenException('Cannot update other users opportunities');
    }

    return this.opportunitiesRepository.update(id, dto);
  }

  async markCompleted(id: string, userId: string, completedByUserId: string) {
    const opportunity = await this.opportunitiesRepository.findById(id);
    if (!opportunity) {
      throw new NotFoundException('Opportunity not found');
    }

    if (opportunity.opportunity.userId !== userId) {
      throw new ForbiddenException('Only the owner can mark opportunity as completed');
    }

    return this.opportunitiesRepository.markCompleted(id, completedByUserId);
  }

  async delete(id: string, userId: string, isAdmin: boolean) {
    const opportunity = await this.opportunitiesRepository.findById(id);
    if (!opportunity) {
      throw new NotFoundException('Opportunity not found');
    }

    if (opportunity.opportunity.userId !== userId && !isAdmin) {
      throw new ForbiddenException('Cannot delete other users opportunities');
    }

    return this.opportunitiesRepository.softDelete(id);
  }

  async count(filters: FilterOpportunityDto) {
    return this.opportunitiesRepository.count(filters);
  }
}
