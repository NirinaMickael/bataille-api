import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './@utils/middleware/error.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // thus ensuring all endpoints are protected from receiving incorrect data
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
