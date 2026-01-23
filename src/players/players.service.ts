import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import {
  CreatePlayerDto,
  UpdatePlayerDto,
  PlayersFiltersDto,
} from './players.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    filters?: PlayersFiltersDto,
  ) {
    const queryBuilder = this.playersRepository.createQueryBuilder('player');

    // Текстовые фильтры (поиск по подстроке, case-insensitive)
    if (filters?.player) {
      queryBuilder.andWhere('LOWER(player.fullName) LIKE LOWER(:player)');
      queryBuilder.setParameter('player', `%${filters.player}%`);
    }

    if (filters?.league) {
      queryBuilder.andWhere('LOWER(player.league) LIKE LOWER(:league)');
      queryBuilder.setParameter('league', `%${filters.league}%`);
    }

    if (filters?.team) {
      queryBuilder.andWhere('LOWER(player.club) LIKE LOWER(:team)');
      queryBuilder.setParameter('team', `%${filters.team}%`);
    }

    // Точные совпадения
    if (filters?.position) {
      queryBuilder.andWhere('player.mainPosition = :position');
      queryBuilder.setParameter('position', filters.position);
    }

    if (filters?.country) {
      queryBuilder.andWhere('player.country = :country');
      queryBuilder.setParameter('country', filters.country);
    }

    if (filters?.foot) {
      queryBuilder.andWhere('player.foot = :foot');
      queryBuilder.setParameter('foot', filters.foot);
    }

    if (filters?.contractExpires) {
      queryBuilder.andWhere('player.contractExpires = :contractExpires');
      queryBuilder.setParameter('contractExpires', filters.contractExpires);
    }

    // Фильтр по возрасту (вычисляется на основе dateOfBirth)
    if (filters?.ageFrom !== undefined || filters?.ageTo !== undefined) {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const currentDay = now.getDate();

      // Преобразуем в числа на случай, если пришли строки
      const ageFrom =
        filters.ageFrom !== undefined ? Number(filters.ageFrom) : undefined;
      const ageTo =
        filters.ageTo !== undefined ? Number(filters.ageTo) : undefined;

      if (ageFrom !== undefined && !isNaN(ageFrom)) {
        // Максимальная дата рождения для минимального возраста
        // Если ageFrom = 25, то игрок должен быть >= 25 лет
        // Пример: если сегодня 2024-12-20 и ageFrom = 25, то игрок должен родиться <= 1999-12-20
        // (родился в 1999-12-20 = ровно 25 лет, родился в 1998-12-20 = 26 лет)
        const maxBirthDate = new Date(
          currentYear - ageFrom,
          currentMonth,
          currentDay,
        );
        queryBuilder.andWhere('player.dateOfBirth <= :maxBirthDate');
        queryBuilder.setParameter('maxBirthDate', maxBirthDate);
      }

      if (ageTo !== undefined && !isNaN(ageTo)) {
        // Минимальная дата рождения для максимального возраста
        // Если ageTo = 28, то игрок должен быть <= 28 лет
        // Пример: если сегодня 2024-12-20 и ageTo = 28, то игрок должен родиться >= 1996-12-20
        // (родился в 1996-12-20 = ровно 28 лет, родился в 1997-12-20 = 27 лет)
        const minBirthDate = new Date(
          currentYear - ageTo,
          currentMonth,
          currentDay,
        );
        // Устанавливаем время на начало дня для корректного сравнения
        minBirthDate.setHours(0, 0, 0, 0);
        queryBuilder.andWhere('player.dateOfBirth >= :minBirthDate');
        queryBuilder.setParameter('minBirthDate', minBirthDate);
      }
    }

    // Точные числовые значения
    if (filters?.height !== undefined) {
      queryBuilder.andWhere('player.height = :height');
      queryBuilder.setParameter('height', filters.height);
    }

    if (filters?.weight !== undefined) {
      queryBuilder.andWhere('player.weight = :weight');
      queryBuilder.setParameter('weight', filters.weight);
    }

    // Диапазоны для currentLevel
    if (filters?.currentLevelFrom !== undefined) {
      queryBuilder.andWhere('player.currentLevel >= :currentLevelFrom');
      queryBuilder.setParameter('currentLevelFrom', filters.currentLevelFrom);
    }

    if (filters?.currentLevelTo !== undefined) {
      queryBuilder.andWhere('player.currentLevel <= :currentLevelTo');
      queryBuilder.setParameter('currentLevelTo', filters.currentLevelTo);
    }

    // Диапазоны для potential
    if (filters?.potentialFrom !== undefined) {
      queryBuilder.andWhere('player.potential >= :potentialFrom');
      queryBuilder.setParameter('potentialFrom', filters.potentialFrom);
    }

    if (filters?.potentialTo !== undefined) {
      queryBuilder.andWhere('player.potential <= :potentialTo');
      queryBuilder.setParameter('potentialTo', filters.potentialTo);
    }

    // Сортировка
    queryBuilder.orderBy('player.createdAt', 'DESC');

    // Пагинация
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Подсчет общего количества (с учетом фильтров)
    const total = await queryBuilder.getCount();

    // Получение данных
    const data = await queryBuilder.getMany();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<Player> {
    const player = await this.playersRepository.findOne({ where: { id } });
    if (!player) {
      throw new NotFoundException('Игрок не найден');
    }
    return player;
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    // Преобразуем строковые даты в Date объекты
    const playerData = {
      ...createPlayerDto,
      dateOfBirth: new Date(createPlayerDto.dateOfBirth),
      contractExpires: createPlayerDto.contractExpires
        ? new Date(createPlayerDto.contractExpires)
        : null,
      shortlist: createPlayerDto.shortlist ?? false,
    };

    const newPlayer = this.playersRepository.create(playerData);
    return this.playersRepository.save(newPlayer);
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const player = await this.findOne(id);

    // Извлекаем даты отдельно, остальные поля копируем
    const { dateOfBirth, contractExpires, ...restFields } = updatePlayerDto;

    // Создаем объект для обновления с преобразованными датами
    const updateData: Partial<Player> = {
      ...restFields,
      ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
      ...(contractExpires !== undefined && {
        contractExpires: contractExpires ? new Date(contractExpires) : null,
      }),
    };

    Object.assign(player, updateData);
    return this.playersRepository.save(player);
  }

  async remove(id: number) {
    const player = await this.findOne(id);
    await this.playersRepository.remove(player);
    return { message: 'Игрок успешно удален' };
  }
}
