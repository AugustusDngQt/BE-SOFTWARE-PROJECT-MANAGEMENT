import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorsInterceptor } from './interceptors/error-handling.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ErrorsInterceptor());
  await app.listen(3000);
}
bootstrap();
