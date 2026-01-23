# Рекомендации для бэкенда: Фильтрация игроков

## Проблема

Фронтенд отправляет запросы с правильными query параметрами, но бэкенд не применяет фильтры и всегда возвращает все игроки.

Примеры запросов:
- `GET /api/players?page=1&limit=10&player=Кузнецов`
- `GET /api/players?page=1&limit=10&ageTo=28`
- `GET /api/players?page=1&limit=10&position=forward`

## Ожидаемые query параметры

### Текстовые фильтры (поиск по подстроке):
- `player` - поиск по имени игрока (fullName)
- `league` - поиск по лиге
- `team` - поиск по команде (club)

### Точные совпадения:
- `position` - точное совпадение позиции (goalkeeper, defender, midfielder, forward, winger, striker)
- `country` - точное совпадение страны (Argentina, Brazil, France, и т.д.)
- `foot` - точное совпадение ноги (left, right)
- `contractExpires` - дата в формате 'YYYY-MM-DD'

### Числовые фильтры (диапазоны):
- `ageFrom` - минимальный возраст (число)
- `ageTo` - максимальный возраст (число)
- `height` - точное значение роста в см (число)
- `weight` - точное значение веса в кг (число)
- `currentLevelFrom` - минимальный текущий уровень (0-10)
- `currentLevelTo` - максимальный текущий уровень (0-10)
- `potentialFrom` - минимальный потенциал (0-10)
- `potentialTo` - максимальный потенциал (0-10)

## Логика фильтрации

### Возраст (ageFrom, ageTo)
**Важно:** Возраст должен вычисляться на бэкенде на основе `dateOfBirth` и текущей даты.
- Если указан `ageFrom` - фильтровать игроков с возрастом >= ageFrom
- Если указан `ageTo` - фильтровать игроков с возрастом <= ageTo
- Если указаны оба - фильтровать игроков с возрастом в диапазоне [ageFrom, ageTo]

### Поиск по имени (player)
- Поиск должен быть case-insensitive
- Поиск по подстроке в поле `fullName`
- Пример: `player=Кузнецов` должен находить всех игроков, у которых `fullName` содержит "Кузнецов"

### Позиция (position)
- Точное совпадение с `mainPosition`
- Возможные значения: `goalkeeper`, `defender`, `midfielder`, `forward`, `winger`, `striker`

### Лига и команда (league, team)
- Поиск по подстроке (case-insensitive)
- `league` - поиск в поле `league`
- `team` - поиск в поле `club`

### Страна (country)
- Точное совпадение с полем `country`
- Возможные значения из `CountryEnum`

### Контракт (contractExpires)
- Фильтрация по дате окончания контракта
- Формат: `YYYY-MM-DD`
- Можно фильтровать по точной дате или использовать операторы (>=, <=)

### Нога (foot)
- Точное совпадение: `left` или `right`

### Рост и вес (height, weight)
- Точное совпадение числовых значений

### Уровень и потенциал (currentLevelFrom/To, potentialFrom/To)
- Диапазон значений от 0 до 10
- Если указан `From` - >= значение
- Если указан `To` - <= значение

## Пример реализации (псевдокод)

```typescript
// В контроллере или сервисе
async getPlayers(page: number, limit: number, filters: PlayersFiltersDto) {
  const queryBuilder = this.playersRepository.createQueryBuilder('player');
  
  // Поиск по имени
  if (filters.player) {
    queryBuilder.andWhere('LOWER(player.fullName) LIKE LOWER(:player)', {
      player: `%${filters.player}%`
    });
  }
  
  // Позиция
  if (filters.position) {
    queryBuilder.andWhere('player.mainPosition = :position', {
      position: filters.position
    });
  }
  
  // Возраст (вычисляется на основе dateOfBirth)
  if (filters.ageFrom !== undefined || filters.ageTo !== undefined) {
    const now = new Date();
    if (filters.ageFrom !== undefined) {
      const maxBirthDate = new Date(now.getFullYear() - filters.ageFrom, now.getMonth(), now.getDate());
      queryBuilder.andWhere('player.dateOfBirth <= :maxBirthDate', { maxBirthDate });
    }
    if (filters.ageTo !== undefined) {
      const minBirthDate = new Date(now.getFullYear() - filters.ageTo - 1, now.getMonth(), now.getDate());
      queryBuilder.andWhere('player.dateOfBirth >= :minBirthDate', { minBirthDate });
    }
  }
  
  // Лига
  if (filters.league) {
    queryBuilder.andWhere('LOWER(player.league) LIKE LOWER(:league)', {
      league: `%${filters.league}%`
    });
  }
  
  // Команда
  if (filters.team) {
    queryBuilder.andWhere('LOWER(player.club) LIKE LOWER(:team)', {
      team: `%${filters.team}%`
    });
  }
  
  // Страна
  if (filters.country) {
    queryBuilder.andWhere('player.country = :country', {
      country: filters.country
    });
  }
  
  // Контракт
  if (filters.contractExpires) {
    queryBuilder.andWhere('player.contractExpires = :contractExpires', {
      contractExpires: filters.contractExpires
    });
  }
  
  // Нога
  if (filters.foot) {
    queryBuilder.andWhere('player.foot = :foot', {
      foot: filters.foot
    });
  }
  
  // Рост
  if (filters.height !== undefined) {
    queryBuilder.andWhere('player.height = :height', {
      height: filters.height
    });
  }
  
  // Вес
  if (filters.weight !== undefined) {
    queryBuilder.andWhere('player.weight = :weight', {
      weight: filters.weight
    });
  }
  
  // Текущий уровень
  if (filters.currentLevelFrom !== undefined) {
    queryBuilder.andWhere('player.currentLevel >= :currentLevelFrom', {
      currentLevelFrom: filters.currentLevelFrom
    });
  }
  if (filters.currentLevelTo !== undefined) {
    queryBuilder.andWhere('player.currentLevel <= :currentLevelTo', {
      currentLevelTo: filters.currentLevelTo
    });
  }
  
  // Потенциал
  if (filters.potentialFrom !== undefined) {
    queryBuilder.andWhere('player.potential >= :potentialFrom', {
      potentialFrom: filters.potentialFrom
    });
  }
  if (filters.potentialTo !== undefined) {
    queryBuilder.andWhere('player.potential <= :potentialTo', {
      potentialTo: filters.potentialTo
    });
  }
  
  // Пагинация
  const skip = (page - 1) * limit;
  queryBuilder.skip(skip).take(limit);
  
  // Подсчет общего количества (с учетом фильтров)
  const total = await queryBuilder.getCount();
  
  // Получение данных
  const players = await queryBuilder.getMany();
  
  return {
    data: players,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}
```

## Важные моменты

1. **Все фильтры должны применяться одновременно** (AND логика)
2. **Пагинация должна применяться после фильтрации**
3. **`total` в мета-информации должен отражать количество отфильтрованных записей**, а не общее количество в БД
4. **Возраст вычисляется на бэкенде** - не полагайтесь на фронтенд
5. **Поиск по тексту должен быть case-insensitive** и по подстроке (LIKE)
6. **Точные совпадения** (position, country, foot) должны использовать точное сравнение (=)

## Тестирование

Проверьте следующие сценарии:
1. Фильтр по имени: `?player=Кузнецов` - должен вернуть только игроков с "Кузнецов" в имени
2. Фильтр по возрасту: `?ageTo=28` - должен вернуть только игроков возрастом <= 28 лет
3. Фильтр по позиции: `?position=forward` - должен вернуть только форвардов
4. Комбинация фильтров: `?player=Кузнецов&ageTo=28&position=forward` - должен применить все фильтры одновременно
5. Пустые фильтры: `?page=1&limit=10` - должен вернуть все игроки с пагинацией
