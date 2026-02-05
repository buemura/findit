import { Global, Module, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDatabaseConnection, Database } from './client';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('Database');
        const connectionString = configService.get<string>('DATABASE_URL');

        if (!connectionString) {
          logger.error('DATABASE_URL environment variable is not set');
          throw new Error('DATABASE_URL environment variable is not set');
        }

        logger.log('Database connection established');
        return createDatabaseConnection(connectionString);
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}

export { Database };
