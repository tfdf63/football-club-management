import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayersService {
  findAll() {
    return [];
  }

  findOne(id: number) {
    return { id };
  }

  create(createPlayerDto: any) {
    return { message: 'Player created' };
  }
}
