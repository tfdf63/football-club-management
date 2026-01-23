import { PlayerPosition } from '../enums/player-position.enum';
import { PlayerFoot } from '../enums/player-foot.enum';
import { CountryEnum } from '../enums/country.enum';

export class PlayerResponseDto {
  id: number;
  fullName: string;
  dateOfBirth: Date;
  transfermarktLink: string | null;
  photoUrl: string | null;
  country: CountryEnum;
  city: string | null;
  league: string | null;
  club: string | null;
  youthAcademy: string | null;
  mainPosition: PlayerPosition;
  position2: PlayerPosition | null;
  position3: PlayerPosition | null;
  height: number;
  weight: number;
  foot: PlayerFoot;
  contractExpires: Date | null;
  currentLevel: number;
  potential: number;
  shortlist: boolean;
  createdAt: Date;
  updatedAt: Date;
}
