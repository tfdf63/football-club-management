import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './users/entities/user.entity';

// Загружаем переменные окружения
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [User], // Все сущности
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'], // Путь к миграциям
  synchronize: false, // Всегда false для миграций
});
