import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity("compliments")
class Compliment {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    sender_id: string;

    @JoinColumn({ name: "sender_id" })
    @ManyToOne(() => User)
    sender: User;

    @Column()
    receiver_id: string;

    @JoinColumn({ name: "receiver_id" })
    @ManyToOne(() => User)
    receiver: User;

    @Column()
    tag_id: string;

    @JoinColumn({ name: "tag_id" })
    @ManyToOne(() => Tag)
    tag: Tag;

    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { Compliment }