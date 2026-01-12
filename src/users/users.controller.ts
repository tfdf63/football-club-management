import { Body, Controller, Get, Param, Post } from '@nestjs/common'; //Нужно будет добавить UseGuards, если использовать AuthGuard
import { UsersService } from './users.service';
// import { AuthGuard } from 'src/conception/guard';
import { CreateUsersDto } from './users.dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }
}
