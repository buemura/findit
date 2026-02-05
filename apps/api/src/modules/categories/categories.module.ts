import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { RolesGuard } from '@/common/guards/roles.guard';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CategoriesRepository,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
