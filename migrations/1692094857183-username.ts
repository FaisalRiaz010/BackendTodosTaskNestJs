/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm"

export class Username1692094857183 implements MigrationInterface {

     async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "todo" RENAME COLUMN "title" TO "name"`,
        )
    }

     async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" RENAME COLUMN "name" TO "newtitle"`,
        )
    }

}
