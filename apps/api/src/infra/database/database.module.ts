import { Module } from '@nestjs/common';

import { ProfileRepository, UserRepository } from '@domain/user/repositories';
import { PrismaService } from './prisma';
import {
  PrismaProfileRepository,
  PrismaUserRepository,
} from './prisma/repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ProfileRepository,
      useClass: PrismaProfileRepository,
    },
  ],
  exports: [UserRepository, ProfileRepository],
})
export class DatabaseModule {}
