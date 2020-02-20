import {MigrationInterface, QueryRunner} from "typeorm";

export class init1582162166108 implements MigrationInterface {
    name = 'init1582162166108'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "guild_settings" ("id" varchar PRIMARY KEY NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "member_settings" ("id" varchar PRIMARY KEY NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "user_settings" ("id" varchar PRIMARY KEY NOT NULL, "level" integer NOT NULL, "exp" integer NOT NULL, "maxExp" integer NOT NULL)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user_settings"`, undefined);
        await queryRunner.query(`DROP TABLE "member_settings"`, undefined);
        await queryRunner.query(`DROP TABLE "guild_settings"`, undefined);
    }

}
