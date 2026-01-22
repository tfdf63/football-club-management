import {
  IsString,
  IsEmail,
  MinLength,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class CreateUsersDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(['director', 'scout', 'coach', 'admin'])
  role: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
