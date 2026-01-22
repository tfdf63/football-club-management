import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './users.dto';

export class UpdateUserDto extends PartialType(CreateUsersDto) {}
