import { MigrationInterface, QueryRunner } from "typeorm";

export class SwitchTimeZoneToUTC1545414305323 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const [{ current_database }] = await queryRunner.query(
      `SELECT current_database();`
    );
    await queryRunner.query(`
        ALTER DATABASE ${current_database} SET timezone TO 'UTC';
        `);
    await queryRunner.query(`SELECT pg_reload_conf();`);
  }

  public async down(): Promise<any> {}
}
