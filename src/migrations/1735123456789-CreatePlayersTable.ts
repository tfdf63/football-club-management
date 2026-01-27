import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreatePlayersTable1735123456789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'players',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'fullName',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'dateOfBirth',
            type: 'date',
          },
          {
            name: 'transfermarktLink',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'photoUrl',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'country',
            type: 'enum',
            enum: [
              'Argentina',
              'Brazil',
              'France',
              'Germany',
              'Italy',
              'Spain',
              'England',
              'Portugal',
              'Netherlands',
              'Belgium',
              'Croatia',
              'Uruguay',
              'Colombia',
              'Mexico',
              'United States',
              'Canada',
              'Japan',
              'South Korea',
              'Australia',
              'Russia',
              'Poland',
              'Turkey',
              'Greece',
              'Sweden',
              'Norway',
              'Denmark',
              'Switzerland',
              'Austria',
              'Czech Republic',
              'Ukraine',
              'Serbia',
              'Bosnia and Herzegovina',
              'Algeria',
              'Morocco',
              'Egypt',
              'Nigeria',
              'Senegal',
              'Ghana',
              'Ivory Coast',
              'Cameroon',
              'South Africa',
              'China',
              'India',
              'Thailand',
              'Vietnam',
              'Indonesia',
              'Philippines',
              'Malaysia',
              'Singapore',
              'New Zealand',
              'Chile',
              'Peru',
              'Ecuador',
              'Paraguay',
              'Bolivia',
              'Venezuela',
              'Costa Rica',
              'Panama',
              'Honduras',
              'Jamaica',
              'Trinidad and Tobago',
              'Other',
            ],
          },
          {
            name: 'city',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'league',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'club',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'youthAcademy',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'mainPosition',
            type: 'enum',
            enum: [
              'goalkeeper',
              'defender',
              'midfielder',
              'forward',
              'winger',
              'striker',
            ],
          },
          {
            name: 'position2',
            type: 'enum',
            enum: [
              'goalkeeper',
              'defender',
              'midfielder',
              'forward',
              'winger',
              'striker',
            ],
            isNullable: true,
          },
          {
            name: 'position3',
            type: 'enum',
            enum: [
              'goalkeeper',
              'defender',
              'midfielder',
              'forward',
              'winger',
              'striker',
            ],
            isNullable: true,
          },
          {
            name: 'height',
            type: 'integer',
          },
          {
            name: 'weight',
            type: 'integer',
          },
          {
            name: 'foot',
            type: 'enum',
            enum: ['left', 'right'],
          },
          {
            name: 'contractExpires',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'currentLevel',
            type: 'integer',
          },
          {
            name: 'potential',
            type: 'integer',
          },
          {
            name: 'shortlist',
            type: 'boolean',
            default: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Создаем индексы для часто используемых полей
    await queryRunner.createIndex(
      'players',
      new TableIndex({
        name: 'IDX_PLAYERS_COUNTRY',
        columnNames: ['country'],
      }),
    );

    await queryRunner.createIndex(
      'players',
      new TableIndex({
        name: 'IDX_PLAYERS_CLUB',
        columnNames: ['club'],
      }),
    );

    await queryRunner.createIndex(
      'players',
      new TableIndex({
        name: 'IDX_PLAYERS_MAIN_POSITION',
        columnNames: ['mainPosition'],
      }),
    );

    await queryRunner.createIndex(
      'players',
      new TableIndex({
        name: 'IDX_PLAYERS_SHORTLIST',
        columnNames: ['shortlist'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('players');
  }
}
