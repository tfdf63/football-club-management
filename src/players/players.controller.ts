import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(+id);
  }

  @Post()
  create(@Body() createPlayerDto: any) {
    return this.playerService.create(createPlayerDto);
  }
}
