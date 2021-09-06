import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AltNotesCardsCredentialsTable1630891483983
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'credentials',
      new TableColumn({
        name: 'folder',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'cards',
      new TableColumn({
        name: 'folder',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'notes',
      new TableColumn({
        name: 'folder',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'credentials',
      new TableForeignKey({
        name: 'FolderId',
        columnNames: ['folder'],
        referencedColumnNames: ['id'],
        referencedTableName: 'folders',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'cards',
      new TableForeignKey({
        name: 'FolderId',
        columnNames: ['folder'],
        referencedColumnNames: ['id'],
        referencedTableName: 'folders',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'notes',
      new TableForeignKey({
        name: 'FolderId',
        columnNames: ['folder'],
        referencedColumnNames: ['id'],
        referencedTableName: 'folders',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('notes', 'FolderId');
    await queryRunner.dropForeignKey('cards', 'FolderId');
    await queryRunner.dropForeignKey('credentials', 'FolderId');
    await queryRunner.dropColumn('notes', 'folder');
    await queryRunner.dropColumn('cards', 'folder');
    await queryRunner.dropColumn('credentials', 'folder');
  }
}
