import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async create(dto: CreateCategoryDto) {
    const existing = await this.categoriesRepository.findBySlug(dto.slug);
    if (existing) {
      throw new ConflictException('Category with this slug already exists');
    }
    return this.categoriesRepository.create(dto);
  }

  async findAll(activeOnly = true) {
    return this.categoriesRepository.findAll(activeOnly);
  }

  async findById(id: string) {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    if (dto.slug) {
      const existing = await this.categoriesRepository.findBySlug(dto.slug);
      if (existing && existing.id !== id) {
        throw new ConflictException('Category with this slug already exists');
      }
    }

    const category = await this.categoriesRepository.update(id, dto);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async delete(id: string) {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    await this.categoriesRepository.delete(id);
  }
}
