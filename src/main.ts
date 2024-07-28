import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorsInterceptor } from './interceptors/error-handling.interceptor';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  await app.listen(3000);
}
bootstrap();
