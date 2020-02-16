import {MigrationInterface, QueryRunner} from "typeorm";

export class init1581478339662 implements MigrationInterface {
    name = 'init1581478339662'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "guild_settings" ("id" varchar PRIMARY KEY NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "member_settings" ("id" varchar PRIMARY KEY NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "user_settings" ("id" varchar PRIMARY KEY NOT NULL)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user_settings"`, undefined);
        await queryRunner.query(`DROP TABLE "member_settings"`, undefined);
        await queryRunner.query(`DROP TABLE "guild_settings"`, undefined);
    }

}
