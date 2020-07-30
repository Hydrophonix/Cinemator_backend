import { MigrationInterface, QueryRunner } from 'typeorm';

export class test1596116453554 implements MigrationInterface {
    name = 'test1596116453554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "req_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "projectId" uuid NOT NULL, CONSTRAINT "PK_4aed224f53c63ebd7548cdab29e" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "requisite_req_types_req_type" ("requisiteId" uuid NOT NULL, "reqTypeId" uuid NOT NULL, CONSTRAINT "PK_eccef855f7b7759710eb71b9fe9" PRIMARY KEY ("requisiteId", "reqTypeId"))');
        await queryRunner.query('CREATE INDEX "IDX_e1aaef69a92716311accd56426" ON "requisite_req_types_req_type" ("requisiteId") ');
        await queryRunner.query('CREATE INDEX "IDX_2eb39231f4ff42279e32fda099" ON "requisite_req_types_req_type" ("reqTypeId") ');
        await queryRunner.query('ALTER TABLE "scene" ADD "isCompleted" boolean NOT NULL DEFAULT false');
        await queryRunner.query('ALTER TABLE "req_type" ADD CONSTRAINT "FK_5f1489cf3df23fdc0651f04b6b0" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "requisite_req_types_req_type" ADD CONSTRAINT "FK_e1aaef69a92716311accd564269" FOREIGN KEY ("requisiteId") REFERENCES "requisite"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "requisite_req_types_req_type" ADD CONSTRAINT "FK_2eb39231f4ff42279e32fda0996" FOREIGN KEY ("reqTypeId") REFERENCES "req_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "requisite_req_types_req_type" DROP CONSTRAINT "FK_2eb39231f4ff42279e32fda0996"');
        await queryRunner.query('ALTER TABLE "requisite_req_types_req_type" DROP CONSTRAINT "FK_e1aaef69a92716311accd564269"');
        await queryRunner.query('ALTER TABLE "req_type" DROP CONSTRAINT "FK_5f1489cf3df23fdc0651f04b6b0"');
        await queryRunner.query('ALTER TABLE "scene" DROP COLUMN "isCompleted"');
        await queryRunner.query('DROP INDEX "IDX_2eb39231f4ff42279e32fda099"');
        await queryRunner.query('DROP INDEX "IDX_e1aaef69a92716311accd56426"');
        await queryRunner.query('DROP TABLE "requisite_req_types_req_type"');
        await queryRunner.query('DROP TABLE "req_type"');
    }
}
