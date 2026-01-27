import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakePlayerFieldsOptional1736000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Делаем dateOfBirth nullable
    await queryRunner.query(`
      ALTER TABLE "players" 
      ALTER COLUMN "dateOfBirth" DROP NOT NULL
    `);

    // Делаем country nullable
    await queryRunner.query(`
      ALTER TABLE "players" 
      ALTER COLUMN "country" DROP NOT NULL
    `);

    // Делаем height nullable
    await queryRunner.query(`
      ALTER TABLE "players" 
      ALTER COLUMN "height" DROP NOT NULL
    `);

    // Делаем weight nullable
    await queryRunner.query(`
      ALTER TABLE "players" 
      ALTER COLUMN "weight" DROP NOT NULL
    `);

    // Делаем foot nullable
    await queryRunner.query(`
      ALTER TABLE "players" 
      ALTER COLUMN "foot" DROP NOT NULL
    `);

    // Делаем currentLevel nullable
    await queryRunner.query(`
      ALTER TABLE "players" 
      ALTER COLUMN "currentLevel" DROP NOT NULL
    `);

    // Делаем potential nullable
    await queryRunner.query(`
      ALTER TABLE "players" 
      ALTER COLUMN "potential" DROP NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Возвращаем обратно NOT NULL (но это может вызвать ошибки, если есть NULL значения)
    await queryRunner.query(`
      ALTER TABLE "players" 
      ALTER COLUMN "dateOfBirth" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "players" 
      ALTER COLUMN "country" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "players" 
      ALTER COLUMN "height" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "players" 
      ALTER COLUMN "weight" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "players" 
      ALTER COLUMN "foot" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "players" 
      ALTER COLUMN "currentLevel" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "players" 
      ALTER COLUMN "potential" SET NOT NULL
    `);
  }
}
