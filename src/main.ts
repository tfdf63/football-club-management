import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Настройка CORS для работы с фронтендом на localhost:5173
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Удаляет поля, которых нет в DTO
      forbidNonWhitelisted: true, // Бросает ошибку, если есть лишние поля
      transform: true, // Автоматически преобразует типы
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
