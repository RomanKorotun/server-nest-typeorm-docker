import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEmailVirificationEntity1752229629548 implements MigrationInterface {
    name = 'UpdateUserEmailVirificationEntity1752229629548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_email_verifications" ADD CONSTRAINT "UQ_1c19d9854b61b6d8714906e6d4b" UNIQUE ("verification_code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_email_verifications" DROP CONSTRAINT "UQ_1c19d9854b61b6d8714906e6d4b"`);
    }

}
