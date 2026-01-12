import {
  IsString,
  IsDateString,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { PlayerPosition } from '../enums/player-position.enum';
import { PlayerFoot } from '../enums/player-foot.enum';

export class CreatePlayerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  dateOfBirth: string;

  @IsNumber()
  @Min(100)
  @Max(250)
  height: number; // в сантиметрах

  @IsNumber()
  @Min(30)
  @Max(200)
  weight: number; // в килограммах

  @IsEnum(PlayerPosition)
  position1: PlayerPosition; // основная позиция

  @IsOptional()
  @IsEnum(PlayerPosition)
  position2?: PlayerPosition;

  @IsOptional()
  @IsEnum(PlayerPosition)
  position3?: PlayerPosition;

  @IsString()
  country: string;

  @IsString()
  @IsOptional()
  club?: string; // название клуба или ID, если будет связь с таблицей клубов

  @IsEnum(PlayerFoot)
  foot: PlayerFoot;
}
