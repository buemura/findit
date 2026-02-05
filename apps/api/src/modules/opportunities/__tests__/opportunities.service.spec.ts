import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { OpportunitiesService } from '../opportunities.service';
import { OpportunitiesRepository } from '../opportunities.repository';

describe('OpportunitiesService', () => {
  let service: OpportunitiesService;
  let repository: jest.Mocked<OpportunitiesRepository>;

  const mockOpportunity = {
    opportunity: {
      id: 'opp-1',
      userId: 'user-1',
      categoryId: 'cat-1',
      title: 'Test Opportunity',
      description: 'Test description',
      status: 'open',
      country: 'USA',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    category: { id: 'cat-1', name: 'Web Development', slug: 'web-development' },
    user: { id: 'user-1', name: 'John Doe', email: 'john@example.com' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpportunitiesService,
        {
          provide: OpportunitiesRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            findByUserId: jest.fn(),
            update: jest.fn(),
            softDelete: jest.fn(),
            markCompleted: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OpportunitiesService>(OpportunitiesService);
    repository = module.get(OpportunitiesRepository);
  });

  describe('create', () => {
    it('should create a new opportunity', async () => {
      const dto = {
        title: 'Test Opportunity',
        description: 'Test description',
        categoryId: 'cat-1',
        country: 'USA',
      };
      repository.create.mockResolvedValue(mockOpportunity.opportunity as any);

      const result = await service.create('user-1', dto);

      expect(result).toEqual(mockOpportunity.opportunity);
      expect(repository.create).toHaveBeenCalledWith('user-1', dto);
    });
  });

  describe('findById', () => {
    it('should return opportunity by id', async () => {
      repository.findById.mockResolvedValue(mockOpportunity as any);

      const result = await service.findById('opp-1');

      expect(result).toEqual(mockOpportunity);
    });

    it('should throw NotFoundException if not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('invalid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update opportunity if owner', async () => {
      repository.findById.mockResolvedValue(mockOpportunity as any);
      repository.update.mockResolvedValue(mockOpportunity.opportunity as any);

      const result = await service.update('opp-1', 'user-1', false, { title: 'Updated' });

      expect(result).toEqual(mockOpportunity.opportunity);
    });

    it('should throw ForbiddenException if not owner', async () => {
      repository.findById.mockResolvedValue(mockOpportunity as any);

      await expect(
        service.update('opp-1', 'other-user', false, { title: 'Updated' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should allow admin to update', async () => {
      repository.findById.mockResolvedValue(mockOpportunity as any);
      repository.update.mockResolvedValue(mockOpportunity.opportunity as any);

      const result = await service.update('opp-1', 'other-user', true, { title: 'Updated' });

      expect(result).toEqual(mockOpportunity.opportunity);
    });
  });

  describe('delete', () => {
    it('should soft delete opportunity if owner', async () => {
      repository.findById.mockResolvedValue(mockOpportunity as any);
      repository.softDelete.mockResolvedValue(mockOpportunity.opportunity as any);

      const result = await service.delete('opp-1', 'user-1', false);

      expect(result).toEqual(mockOpportunity.opportunity);
    });

    it('should throw ForbiddenException if not owner', async () => {
      repository.findById.mockResolvedValue(mockOpportunity as any);

      await expect(service.delete('opp-1', 'other-user', false)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
