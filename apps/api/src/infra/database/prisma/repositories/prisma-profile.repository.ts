import { Injectable } from '@nestjs/common';

import { Profile } from '@domain/user/entities';
import { FindOneProfileOption } from '@domain/user/interfaces';
import { ProfileRepository } from '@domain/user/repositories';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProfileRepository implements ProfileRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(opt?: FindOneProfileOption): Promise<Profile> {
    return this.prisma.profile.findFirst({
      where: opt,
    });
  }

  async save(profile: Profile): Promise<Profile> {
    return this.prisma.profile.upsert({
      where: { id: profile.id },
      create: profile,
      update: profile,
    });
  }
}
