import { Expose } from "class-transformer";
import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tags")
class Tag {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Expose({ name: "label" })
    label(): string {
        return `#${this.name}`;
    }

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Tag }