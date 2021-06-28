import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository"
import { classToPlain } from "class-transformer";

class ListComplimentsSentByUser {
    async execute(user_id: string) {
        const complimentsRepository = getCustomRepository(ComplimentsRepository);

        const compliments = await complimentsRepository.find({
            where: {
                sender_id: user_id
            },
            relations: ["receiver", "tag"]
        });

        return classToPlain(compliments);
    }
}

export { ListComplimentsSentByUser }