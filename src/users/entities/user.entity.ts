import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users') // Название таблицы в БД
export class User {
  @PrimaryGeneratedColumn() // Автоинкремент ID
  id: number;

  @Column({ unique: true }) // Уникальный email
  email: string;

  @Column() // Пароль (будет хеширован)
  password: string;

  @Column({
    type: 'enum',
    enum: ['director', 'scout', 'coach', 'admin'],
    default: 'scout', // По умолчанию scout
  })
  role: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @CreateDateColumn() // Автоматически заполняется при создании
  createdAt: Date;

  @UpdateDateColumn() // Автоматически обновляется при изменении
  updatedAt: Date;
}
