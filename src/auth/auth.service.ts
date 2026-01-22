import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from 'src/common/services/password.service';
import { RegisterDto } from './auth.dto/register.dto';
import { LoginDto } from './auth.dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Проверяем, существует ли пользователь
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    // Хешируем пароль
    const hashedPassword = await this.passwordService.hash(
      registerDto.password,
    );

    // Создаем пользователя с захешированным паролем
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      role: 'scout',
    });

    // Удаляем пароль из ответа (безопасность)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...result } = user;

    // Создаем JWT токен
    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    // Возвращаем токен и данные пользователя
    return {
      access_token,
      user: result,
    };
  }

  async login(loginDto: LoginDto) {
    // 1. Находим пользователя по email
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    // 2. Проверяем пароль
    const isPasswordValid = await this.passwordService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    // 3. Удаляем пароль из ответа
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...result } = user;

    // 4. Создаем JWT токен
    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    // 5. Возвращаем токен и данные пользователя
    return {
      access_token,
      user: result,
    };
  }
}
