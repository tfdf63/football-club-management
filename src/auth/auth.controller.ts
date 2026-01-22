import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './auth.dto/register.dto';
import { LoginDto } from './auth.dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from './decorators/user.decorator';
import type { UserWithoutPassword } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: UserWithoutPassword) {
    return user;
  }
}
