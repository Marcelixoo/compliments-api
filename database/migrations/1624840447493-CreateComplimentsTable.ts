import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateComplimentsTable1624840447493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "compliments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "sender_id",
                        type: "uuid"
                    },
                    {
                        name: "receiver_id",
                        type: "uuid"
                    },
                    {
                        name: "tag_id",
                        type: "uuid"
                    },
                    {
                        name: "message",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FK_USER_SENDER_COMPLIMENTS",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["sender_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FK_USER_RECEIVER_COMPLIMENTS",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["receiver_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FK_TAG_COMPLIMENTS",
                        referencedTableName: "tags",
                        referencedColumnNames: ["id"],
                        columnNames: ["tag_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments");
    }

}
