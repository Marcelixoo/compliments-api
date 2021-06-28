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
        const concatenatedAndCapitalized = new ConcatenatedAndCapitalized(this.name);
        return `#${concatenatedAndCapitalized.asString()}`;
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

class ConcatenatedAndCapitalized {
    value: string;

    constructor(word) {
        this.value = this.concatenate(this.capitalize(word));
    }

    capitalize(word) {
        return word.split(" ").map((fragment) => {
            const [firstLetter, ...rest] = fragment;
            return firstLetter.toUpperCase() + rest.join("");
        })
    }

    concatenate(words) {
        return words.join("");
    }

    asString() {
        return this.value;
    }
}

export { Tag }