import { PlayerPosition } from '../enums/player-position.enum';
import { PlayerFoot } from '../enums/player-foot.enum';

export class PlayerResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
  height: number;
  weight: number;
  position1: PlayerPosition;
  position2?: PlayerPosition;
  position3?: PlayerPosition;
  country: string;
  club?: string;
  foot: PlayerFoot;
}
