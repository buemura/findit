import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export class SeedUsers1630710449951 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = 'test';
    const query =
      'INSERT INTO users (id, name, email, password, city, state, country, phone, occupation, about_me, email_verified, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';

    await queryRunner.query(query, [
      'fdb709c7-6715-4758-a51c-9edbfd34ad85',
      'Bruno Uemura',
      'bruno.uemura@gmail.com',
      await bcrypt.hash(password, 10),
      'Campinas',
      'São Paulo',
      'Brazil',
      '+55 19 99999-9999',
      'Software Engineer',
      'I am a Software Engineer',
      true,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      '3cfe35ca-7156-4513-af6a-cc846179c8be',
      'José Lacerda',
      'jose.lacerda@gmail.com',
      await bcrypt.hash(password, 10),
      'Sumaré',
      'São Paulo',
      'Brazil',
      '+55 19 99999-8888',
      'Frotend Developer',
      'I am a Frotend Developer',
      true,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      'be39e9d9-8318-44b5-a5e4-06c1741cb6d6',
      'Linus Lorvalds',
      'linus.torvalds@gmail.com',
      await bcrypt.hash(password, 10),
      'Helsinki',
      'SF',
      'Finland',
      '+55 19 99999-7777',
      'Software Engineer',
      'I am the creator of Linux Operating System',
      true,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      '6bde487f-5cad-45ea-995c-ea4eff6fde79',
      'Bill Gates',
      'bill.gates@gmail.com',
      await bcrypt.hash(password, 10),
      'Seattle',
      'Washington, D.C.',
      'USA',
      '+55 19 99999-6666',
      'CEO at Microsoft',
      'I am the CEO of Microsoft',
      true,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      '1b4c8ab3-bcf3-4390-98c7-312a664759c4',
      'Elon Musk',
      'elon.musk@gmail.com',
      await bcrypt.hash(password, 10),
      'Pretoria',
      'Gauteng',
      'South Africa',
      '+55 19 99999-5555',
      'CEO at Tesla',
      'I am the CEO of Tesla',
      true,
      new Date(),
      new Date(),
    ]);

    await queryRunner.query(query, [
      'ed82cae9-c6b0-4e5d-95df-89efd56335df',
      'Mark Zuckerberg',
      'mark.zuckerberg@gmail.com',
      await bcrypt.hash(password, 10),
      'White Plains',
      'New York',
      'USA',
      '+55 19 99999-4444',
      'CEO at Facebook',
      'I am the founder of Facebook',
      true,
      new Date(),
      new Date(),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
