import { Module } from '@nestjs/common';

import { CreateUserUsecase } from '@app/user';
import { DatabaseModule } from '@infra/database';
import { AuthController } from './auth.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [CreateUserUsecase],
})
export class AuthModule {}
