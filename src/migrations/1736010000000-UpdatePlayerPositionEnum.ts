import { MigrationInterface, QueryRunner } from 'typeorm';

const NEW_VALUES = [
  'GK',
  'LCB',
  'CB',
  'RCB',
  'LB',
  'LWB',
  'PLM',
  'DM',
  'RB',
  'RWB',
  'CM',
  'CAM',
  'LW',
  'CF',
  'SS',
  'RW',
];

export class UpdatePlayerPositionEnum1736010000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const enumList = NEW_VALUES.map((v) => `'${v}'`).join(', ');
    await queryRunner.query(
      `CREATE TYPE "player_position_enum" AS ENUM (${enumList})`,
    );

    await queryRunner.query(`
      ALTER TABLE "players"
      ALTER COLUMN "mainPosition" TYPE "player_position_enum"
      USING (CASE "mainPosition"::text
        WHEN 'goalkeeper' THEN 'GK'
        WHEN 'defender' THEN 'CB'
        WHEN 'midfielder' THEN 'CM'
        WHEN 'forward' THEN 'CF'
        WHEN 'winger' THEN 'LW'
        WHEN 'striker' THEN 'CF'
        ELSE 'CM'
      END::player_position_enum)
    `);

    await queryRunner.query(`
      ALTER TABLE "players"
      ALTER COLUMN "position2" TYPE "player_position_enum"
      USING (CASE WHEN "position2" IS NULL THEN NULL ELSE (CASE "position2"::text
        WHEN 'goalkeeper' THEN 'GK'
        WHEN 'defender' THEN 'CB'
        WHEN 'midfielder' THEN 'CM'
        WHEN 'forward' THEN 'CF'
        WHEN 'winger' THEN 'LW'
        WHEN 'striker' THEN 'CF'
        ELSE 'CM'
      END)::player_position_enum END)
    `);

    await queryRunner.query(`
      ALTER TABLE "players"
      ALTER COLUMN "position3" TYPE "player_position_enum"
      USING (CASE WHEN "position3" IS NULL THEN NULL ELSE (CASE "position3"::text
        WHEN 'goalkeeper' THEN 'GK'
        WHEN 'defender' THEN 'CB'
        WHEN 'midfielder' THEN 'CM'
        WHEN 'forward' THEN 'CF'
        WHEN 'winger' THEN 'LW'
        WHEN 'striker' THEN 'CF'
        ELSE 'CM'
      END)::player_position_enum END)
    `);

    for (const typeName of [
      'players_mainposition_enum',
      'players_position2_enum',
      'players_position3_enum',
    ]) {
      await queryRunner.query(`DROP TYPE IF EXISTS "${typeName}"`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "players_mainposition_enum" AS ENUM (
        'goalkeeper', 'defender', 'midfielder', 'forward', 'winger', 'striker'
      )
    `);
    await queryRunner.query(`
      CREATE TYPE "players_position2_enum" AS ENUM (
        'goalkeeper', 'defender', 'midfielder', 'forward', 'winger', 'striker'
      )
    `);
    await queryRunner.query(`
      CREATE TYPE "players_position3_enum" AS ENUM (
        'goalkeeper', 'defender', 'midfielder', 'forward', 'winger', 'striker'
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "players"
      ALTER COLUMN "mainPosition" TYPE "players_mainposition_enum"
      USING (CASE "mainPosition"::text
        WHEN 'GK' THEN 'goalkeeper'
        WHEN 'LCB' THEN 'defender'
        WHEN 'CB' THEN 'defender'
        WHEN 'RCB' THEN 'defender'
        WHEN 'LB' THEN 'defender'
        WHEN 'LWB' THEN 'defender'
        WHEN 'PLM' THEN 'midfielder'
        WHEN 'DM' THEN 'midfielder'
        WHEN 'RB' THEN 'defender'
        WHEN 'RWB' THEN 'defender'
        WHEN 'CM' THEN 'midfielder'
        WHEN 'CAM' THEN 'midfielder'
        WHEN 'LW' THEN 'winger'
        WHEN 'CF' THEN 'striker'
        WHEN 'SS' THEN 'striker'
        WHEN 'RW' THEN 'winger'
        ELSE 'midfielder'
      END::players_mainposition_enum)
    `);

    await queryRunner.query(`
      ALTER TABLE "players"
      ALTER COLUMN "position2" TYPE "players_position2_enum"
      USING (CASE WHEN "position2" IS NULL THEN NULL ELSE (CASE "position2"::text
        WHEN 'GK' THEN 'goalkeeper'
        WHEN 'LCB' THEN 'defender'
        WHEN 'CB' THEN 'defender'
        WHEN 'RCB' THEN 'defender'
        WHEN 'LB' THEN 'defender'
        WHEN 'LWB' THEN 'defender'
        WHEN 'PLM' THEN 'midfielder'
        WHEN 'DM' THEN 'midfielder'
        WHEN 'RB' THEN 'defender'
        WHEN 'RWB' THEN 'defender'
        WHEN 'CM' THEN 'midfielder'
        WHEN 'CAM' THEN 'midfielder'
        WHEN 'LW' THEN 'winger'
        WHEN 'CF' THEN 'striker'
        WHEN 'SS' THEN 'striker'
        WHEN 'RW' THEN 'winger'
        ELSE 'midfielder'
      END)::players_position2_enum END)
    `);

    await queryRunner.query(`
      ALTER TABLE "players"
      ALTER COLUMN "position3" TYPE "players_position3_enum"
      USING (CASE WHEN "position3" IS NULL THEN NULL ELSE (CASE "position3"::text
        WHEN 'GK' THEN 'goalkeeper'
        WHEN 'LCB' THEN 'defender'
        WHEN 'CB' THEN 'defender'
        WHEN 'RCB' THEN 'defender'
        WHEN 'LB' THEN 'defender'
        WHEN 'LWB' THEN 'defender'
        WHEN 'PLM' THEN 'midfielder'
        WHEN 'DM' THEN 'midfielder'
        WHEN 'RB' THEN 'defender'
        WHEN 'RWB' THEN 'defender'
        WHEN 'CM' THEN 'midfielder'
        WHEN 'CAM' THEN 'midfielder'
        WHEN 'LW' THEN 'winger'
        WHEN 'CF' THEN 'striker'
        WHEN 'SS' THEN 'striker'
        WHEN 'RW' THEN 'winger'
        ELSE 'midfielder'
      END)::players_position3_enum END)
    `);

    await queryRunner.query(`DROP TYPE "player_position_enum"`);
  }
}
