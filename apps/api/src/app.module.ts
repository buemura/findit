import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { DatabaseModule } from './infrastructure/database/database.module';
import { LoggerModule } from './common/logger/logger.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { OpportunitiesModule } from './modules/opportunities/opportunities.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { ChatModule } from './modules/chat/chat.module';
import { FeedbackModule } from './modules/feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    OpportunitiesModule,
    PortfolioModule,
    ChatModule,
    FeedbackModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
