import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1630179602370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'infos',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'notes',
            type: 'uuid',
            isArray: true,
          },
          {
            name: 'folders',
            type: 'uuid',
            isArray: true,
          },
          {
            name: 'credentials',
            type: 'uuid',
            isArray: true,
          },
          {
            name: 'cards',
            type: 'uuid',
            isArray: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
