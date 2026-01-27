import {
  IsString,
  IsDateString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsUrl,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';
import { PlayerPosition } from '../enums/player-position.enum';
import { PlayerFoot } from '../enums/player-foot.enum';
import { CountryEnum } from '../enums/country.enum';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsUrl()
  transfermarktLink?: string;

  @IsOptional()
  @IsUrl()
  photoUrl?: string;

  @IsOptional()
  @IsEnum(CountryEnum)
  country?: CountryEnum;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  league?: string;

  @IsOptional()
  @IsString()
  club?: string;

  @IsOptional()
  @IsString()
  youthAcademy?: string;

  @IsEnum(PlayerPosition)
  mainPosition: PlayerPosition;

  @IsOptional()
  @IsEnum(PlayerPosition)
  position2?: PlayerPosition;

  @IsOptional()
  @IsEnum(PlayerPosition)
  position3?: PlayerPosition;

  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(250)
  height?: number; // в сантиметрах

  @IsOptional()
  @IsNumber()
  @Min(30)
  @Max(200)
  weight?: number; // в килограммах

  @IsOptional()
  @IsEnum(PlayerFoot)
  foot?: PlayerFoot;

  @IsOptional()
  @IsDateString()
  contractExpires?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  currentLevel?: number; // от 0 до 10

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  potential?: number; // от 0 до 10

  @IsOptional()
  @IsBoolean()
  shortlist?: boolean;
}
