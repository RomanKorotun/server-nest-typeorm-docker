import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEntity1751468331557 implements MigrationInterface {
    name = 'AddUserEntity1751468331557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(125) NOT NULL, "last_name" character varying(125) NOT NULL, "email" character varying(125) NOT NULL, "password" character varying(125) NOT NULL, "is_email_confirmed" boolean NOT NULL DEFAULT false, "email_verification_code" character varying(65), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "users_email_uq" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
