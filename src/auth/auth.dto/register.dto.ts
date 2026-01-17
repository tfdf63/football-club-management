import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email должен быть валидным' })
  @IsNotEmpty({ message: 'Email обязателен' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Пароль должен быть минимум 8 символов' })
  @IsNotEmpty({ message: 'Пароль обязателен' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Имя обязательно' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Фамилия обязательна' })
  lastName: string;
}
