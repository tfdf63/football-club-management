import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // ← Добавить
import { Repository } from 'typeorm'; // ← Добавить
import { User } from './entities/user.entity'; // ← Добавить
import { CreateUsersDto } from './users.dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}
  async findAll(): Promise<User[]> {
    return this.users.find();
    // return { message: 'Список пользователей' };
  }

  async findOne(id: number): Promise<User | null> {
    return this.users.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.findOne({ where: { email } });
  }

  async create(dto: CreateUsersDto): Promise<User> {
    // Проверяем существование пользователя по email
    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }
    const newUser = this.users.create(dto);
    return this.users.save(newUser);
  }
}
