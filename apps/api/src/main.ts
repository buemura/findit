import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { join } from 'path';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    },
  );

  const configService = app.get(ConfigService);
  const nodeEnv = configService.get('NODE_ENV', 'development');

  logger.log(`Starting application in ${nodeEnv} mode`);

  app.enableCors({ origin: true, credentials: true });
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.register(multipart, {
    limits: { fileSize: configService.get<number>('MAX_FILE_SIZE', 5242880) },
  });

  const uploadDir = configService.get<string>('UPLOAD_DIR', 'uploads');
  await app.register(fastifyStatic, {
    root: join(__dirname, '..', uploadDir),
    prefix: '/uploads/',
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('FindIt API')
    .setDescription('FindIt Marketplace API Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'JWT-auth',
    )
    .addTag('Auth')
    .addTag('Users')
    .addTag('Categories')
    .addTag('Opportunities')
    .addTag('Portfolio')
    .addTag('Chat')
    .addTag('Feedback')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get<number>('PORT', 3001);
  await app.listen(port, '0.0.0.0');

  logger.log(`Server running on http://localhost:${port}`);
  logger.log(`Swagger documentation: http://localhost:${port}/api-docs`);
  logger.log(`Environment: ${nodeEnv}`);
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Failed to start application', error.stack);
  process.exit(1);
});
