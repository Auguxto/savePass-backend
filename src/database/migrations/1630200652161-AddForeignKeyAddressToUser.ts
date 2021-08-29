import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddForeignKeyAddressToUser1630200652161
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'Address',
        columnNames: ['address'],
        referencedColumnNames: ['id'],
        referencedTableName: 'address',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'Address');
  }
}
