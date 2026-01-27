import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsDateString,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PlayerPosition } from '../enums/player-position.enum';
import { PlayerFoot } from '../enums/player-foot.enum';
import { CountryEnum } from '../enums/country.enum';

export class PlayersFiltersDto {
  // Пагинация
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
  // Текстовые фильтры (поиск по подстроке)
  @IsOptional()
  @IsString()
  player?: string; // поиск по fullName

  @IsOptional()
  @IsString()
  league?: string; // поиск по league

  @IsOptional()
  @IsString()
  team?: string; // поиск по club

  // Точные совпадения
  @IsOptional()
  @IsEnum(PlayerPosition)
  position?: PlayerPosition;

  @IsOptional()
  @IsEnum(CountryEnum)
  country?: CountryEnum;

  @IsOptional()
  @IsEnum(PlayerFoot)
  foot?: PlayerFoot;

  // Диапазоны для contractExpires
  @IsOptional()
  @IsDateString()
  contractExpiresFrom?: string; // формат 'YYYY-MM-DD'

  @IsOptional()
  @IsDateString()
  contractExpiresTo?: string; // формат 'YYYY-MM-DD'

  // Числовые фильтры (диапазоны)
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  ageFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  ageTo?: number;

  // Диапазоны для height
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(100)
  @Max(250)
  heightFrom?: number; // минимальный рост в см

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(100)
  @Max(250)
  heightTo?: number; // максимальный рост в см

  // Диапазоны для weight
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(30)
  @Max(200)
  weightFrom?: number; // минимальный вес в кг

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(30)
  @Max(200)
  weightTo?: number; // максимальный вес в кг

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10)
  currentLevelFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10)
  currentLevelTo?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10)
  potentialFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10)
  potentialTo?: number;
}
