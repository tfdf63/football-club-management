import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: any) {
    //Здесь будет регистрация
    return { message: 'Registor endpoint' };
  }

  @Post('login')
  login(@Body() loginDto: any) {
    //Здесь будет вход
    return { message: 'Login endpoint' };
  }
}
