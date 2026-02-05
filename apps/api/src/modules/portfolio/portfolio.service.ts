import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PortfolioRepository } from './portfolio.repository';
import { CreatePortfolioItemDto, UpdatePortfolioItemDto } from './dto';

@Injectable()
export class PortfolioService {
  constructor(private portfolioRepository: PortfolioRepository) {}

  async create(userId: string, dto: CreatePortfolioItemDto) {
    return this.portfolioRepository.create(userId, dto);
  }

  async findByUserId(userId: string) {
    return this.portfolioRepository.findByUserId(userId);
  }

  async findById(id: string) {
    const item = await this.portfolioRepository.findById(id);
    if (!item || item.isDeleted) {
      throw new NotFoundException('Portfolio item not found');
    }
    return item;
  }

  async update(id: string, userId: string, dto: UpdatePortfolioItemDto) {
    const item = await this.portfolioRepository.findById(id);
    if (!item || item.isDeleted) {
      throw new NotFoundException('Portfolio item not found');
    }
    if (item.userId !== userId) {
      throw new ForbiddenException('Cannot update other users portfolio items');
    }
    return this.portfolioRepository.update(id, dto);
  }

  async delete(id: string, userId: string) {
    const item = await this.portfolioRepository.findById(id);
    if (!item || item.isDeleted) {
      throw new NotFoundException('Portfolio item not found');
    }
    if (item.userId !== userId) {
      throw new ForbiddenException('Cannot delete other users portfolio items');
    }
    return this.portfolioRepository.softDelete(id);
  }
}
