import { Module } from '@nestjs/common';

import { GetUserUsecase } from '@app/user';
import { DatabaseModule } from '@infra/database';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [GetUserUsecase],
})
export class UserModule {}
