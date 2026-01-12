import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './players.dto';

@Injectable()
export class PlayersService {
  findAll() {
    return [];
  }

  findOne(id: number) {
    return { id };
  }

  create(createPlayerDto: CreatePlayerDto) {
    // TODO: Implement player creation logic
    return { message: 'Player created', data: createPlayerDto };
  }
}
