import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEmailVerificationEntity1751469460793 implements MigrationInterface {
    name = 'AddUserEmailVerificationEntity1751469460793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_email_verifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_email_confirmed" boolean NOT NULL DEFAULT false, "email_verification_code" character varying(65), "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "user_email_verifications_user_id_uq" UNIQUE ("user_id"), CONSTRAINT "REL_032b8b38e95b5fdb441fb16d00" UNIQUE ("user_id"), CONSTRAINT "PK_6f8c4d3c47a5bdff33f6009477d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_email_confirmed"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email_verification_code"`);
        await queryRunner.query(`ALTER TABLE "user_email_verifications" ADD CONSTRAINT "FK_032b8b38e95b5fdb441fb16d004" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_email_verifications" DROP CONSTRAINT "FK_032b8b38e95b5fdb441fb16d004"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email_verification_code" character varying(65)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_email_confirmed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`DROP TABLE "user_email_verifications"`);
    }

}
