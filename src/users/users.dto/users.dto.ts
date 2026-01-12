import { IsString } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
