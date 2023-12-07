import { Module } from '@nestjs/common';

import { UserModule } from '@api/user';
import { AuthModule } from '@api/auth';

@Module({
  imports: [AuthModule, UserModule],
})
export class AppModule {}
