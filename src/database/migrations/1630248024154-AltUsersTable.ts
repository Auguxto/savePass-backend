import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AltUsersTable1630248024154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      'notes',
      'folders',
      'credentials',
      'cards',
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'notes',
        type: 'uuid',
        isArray: true,
      }),
      new TableColumn({
        name: 'folders',
        type: 'uuid',
        isArray: true,
      }),
      new TableColumn({
        name: 'credentials',
        type: 'uuid',
        isArray: true,
      }),
      new TableColumn({
        name: 'cards',
        type: 'uuid',
        isArray: true,
      }),
    ]);
  }
}
