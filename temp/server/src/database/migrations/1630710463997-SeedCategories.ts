import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class SeedCategories1630710463997 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query =
      'INSERT INTO categories (id, category, created_at, updated_at) VALUES ($1, $2, $3, $4)';

    await queryRunner.query(query, [
      uuidv4(),
      'Administração e Contabilidade',
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      'Aulas e Treinamentos',
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      'Automotivos',
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      'Construção e Reformas',
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      'Consultoria',
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      'Design e AudioVisual',
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      'Engenharia e Arquitetura',
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      'Eventos',
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      'Moda e Beleza',
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      'Saúde e Bem estar',
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      'Tecnologia',
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      uuidv4(),
      'Vendas e Marketing',
      new Date(),
      new Date(),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
