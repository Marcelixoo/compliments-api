import { getCustomRepository } from "typeorm"
import { BusinessRuleViolation } from "../errors/BusinessRuleViolation";
import { ValidationError } from "../errors/ValidationError";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository"
import { UsersRepository } from "../repositories/UsersRepository";

interface ComplimentRequest {
    tag_id: string;
    sender_id: string;
    receiver_id: string;
    message: string;
}

class SendComplimentService {
    async send({ tag_id, sender_id, receiver_id, message }: ComplimentRequest) {
        const complimentsRepository = getCustomRepository(ComplimentsRepository);
        const usersRepository = getCustomRepository(UsersRepository);

        if (!tag_id || !sender_id || !receiver_id) {
            throw new ValidationError("Required fields", "tag_id | sender_id | receiver_id");
        }

        if (sender_id === receiver_id) {
            throw new SelfComplimentViolation();
        }

        const receiver = await usersRepository.findOne(receiver_id);

        if (!receiver) {
            throw new ReceiverDoesNotExist(receiver_id);
        }

        const compliment = complimentsRepository.create({
            tag_id,
            receiver_id,
            sender_id,
            message
        })

        await complimentsRepository.save(compliment);

        return compliment;
    }
}

class SelfComplimentViolation extends BusinessRuleViolation {
    constructor() {
        super("Self compliments are not allowed.");
    }
}

class ReceiverDoesNotExist extends BusinessRuleViolation {
    constructor(receiverId: string) {
        super(`User with id ${receiverId} does not exist.`);
    }
}

export { SendComplimentService }