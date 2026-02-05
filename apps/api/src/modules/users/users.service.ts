import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findById(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }

  async findAll(limit = 20, offset = 0) {
    const users = await this.usersRepository.findAll(limit, offset);
    return users.map(({ passwordHash, ...user }) => user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.usersRepository.update(id, dto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }

  async updatePhoto(id: string, filename: string) {
    const user = await this.usersRepository.updatePhoto(id, filename);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }

  async getStats(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [completedJobs, avgRating, feedbackCount] = await Promise.all([
      this.usersRepository.getCompletedOpportunitiesCount(id),
      this.usersRepository.getAverageRating(id),
      this.usersRepository.getFeedbackCount(id),
    ]);

    return {
      completedJobs,
      averageRating: Math.round(avgRating * 10) / 10,
      feedbackCount,
    };
  }

  async delete(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.delete(id);
  }
}
