import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './users.dto/users.dto';
import { UpdateUserDto } from './users.dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/auth/decorators/user.decorator';
import type { UserWithoutPassword } from './entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.usersService.findAll(pageNum, limitNum);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@User() user: UserWithoutPassword) {
    const currentUser = await this.usersService.getCurrentUser(user.id);
    if (!currentUser) {
      throw new NotFoundException('Пользователь не найден');
    }
    return currentUser;
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateCurrentUser(
    @User() user: UserWithoutPassword,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateCurrentUser(user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('roles')
  getRoles() {
    return {
      roles: ['director', 'scout', 'coach', 'admin'],
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  @Post()
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
