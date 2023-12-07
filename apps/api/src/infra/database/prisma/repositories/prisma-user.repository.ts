import { Injectable } from '@nestjs/common';

import { User } from '@domain/user/entities';
import { FindOneUserOption } from '@domain/user/interfaces';
import { UserRepository } from '@domain/user/repositories';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(opt?: FindOneUserOption): Promise<User> {
    return this.prisma.user.findFirst({
      where: opt,
    });
  }

  async save(user: User): Promise<User> {
    return this.prisma.user.upsert({
      where: { id: user.id },
      create: user,
      update: user,
      include: {
        Profile: true,
      },
    });
  }
}
