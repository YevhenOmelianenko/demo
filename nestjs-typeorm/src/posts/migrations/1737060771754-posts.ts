import { MigrationInterface, QueryRunner } from 'typeorm';

export class Posts1737060771754 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "public"."post" (
        "title" character varying NOT NULL,
        "body" character varying NOT NULL,
        "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
        "authorId" uuid,
        CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")
      ) WITH (oids = false);
    `);

    await queryRunner.query(`
      ALTER TABLE ONLY "public"."post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"
      FOREIGN KEY ("authorId") REFERENCES "user"(id) ON UPDATE SET NULL ON DELETE SET NULL NOT DEFERRABLE;
    `);

    await queryRunner.query(`
      INSERT INTO "post" ("title", "body", "id", "authorId") VALUES
      ('New Post',	'New Body',	'970a35b0-079e-49e3-8d7e-582b279fe3eb', 'd1c7db41-7486-476e-b8cd-b623a2cfc832');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "post";`);
  }
}
