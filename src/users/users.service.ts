import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUsersDto } from './users.dto/users.dto';
import { UpdateUserDto } from './users.dto/update-user.dto';
import { PasswordService } from 'src/common/services/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private passwordService: PasswordService,
  ) {}
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.users.findAndCount({
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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

    // Хешируем пароль перед сохранением
    const hashedPassword = await this.passwordService.hash(dto.password);

    const newUser = this.users.create({
      ...dto,
      password: hashedPassword,
    });
    return this.users.save(newUser);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    // Если обновляется email, проверяем уникальность
    if (dto.email && dto.email !== user.email) {
      const existing = await this.findByEmail(dto.email);
      if (existing) {
        throw new ConflictException('Email уже занят');
      }
    }

    // Если обновляется пароль, хешируем его
    if (dto.password) {
      dto.password = await this.passwordService.hash(dto.password);
    }

    Object.assign(user, dto);
    return this.users.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    await this.users.remove(user);
    return { message: 'Пользователь успешно удален' };
  }

  async getCurrentUser(id: number): Promise<User | null> {
    return this.findOne(id);
  }

  async updateCurrentUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    // Если обновляется email, проверяем уникальность
    if (dto.email && dto.email !== user.email) {
      const existing = await this.findByEmail(dto.email);
      if (existing) {
        throw new ConflictException('Email уже занят');
      }
    }

    // Если обновляется пароль, хешируем его
    if (dto.password) {
      dto.password = await this.passwordService.hash(dto.password);
    }

    Object.assign(user, dto);
    return this.users.save(user);
  }
}
