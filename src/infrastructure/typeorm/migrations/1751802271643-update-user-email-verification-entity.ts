import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEmailVerificationEntity1751802271643 implements MigrationInterface {
    name = 'UpdateUserEmailVerificationEntity1751802271643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_email_verifications" RENAME COLUMN "email_verification_code" TO "verification_code"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_email_verifications" RENAME COLUMN "verification_code" TO "email_verification_code"`);
    }

}
