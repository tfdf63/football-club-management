import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlayerPosition } from '../enums/player-position.enum';
import { PlayerFoot } from '../enums/player-foot.enum';
import { CountryEnum } from '../enums/country.enum';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  transfermarktLink: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  photoUrl: string | null;

  @Column({
    type: 'enum',
    enum: CountryEnum,
  })
  country: CountryEnum;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  league: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  club: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  youthAcademy: string | null;

  @Column({
    type: 'enum',
    enum: PlayerPosition,
  })
  mainPosition: PlayerPosition;

  @Column({
    type: 'enum',
    enum: PlayerPosition,
    nullable: true,
  })
  position2: PlayerPosition | null;

  @Column({
    type: 'enum',
    enum: PlayerPosition,
    nullable: true,
  })
  position3: PlayerPosition | null;

  @Column({ type: 'integer' })
  height: number; // в сантиметрах

  @Column({ type: 'integer' })
  weight: number; // в килограммах

  @Column({
    type: 'enum',
    enum: PlayerFoot,
  })
  foot: PlayerFoot;

  @Column({ type: 'date', nullable: true })
  contractExpires: Date | null;

  @Column({ type: 'integer' })
  currentLevel: number; // от 0 до 10

  @Column({ type: 'integer' })
  potential: number; // от 0 до 10

  @Column({ type: 'boolean', default: false })
  shortlist: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
