import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository"

class ListComplimentsReceivedByUser {
    async execute(user_id: string) {
        const complimentsRepository = getCustomRepository(ComplimentsRepository);

        const compliments = await complimentsRepository.find({
            where: {
                receiver_id: user_id
            },
            relations: ["sender", "tag"]
        });

        return compliments;
    }
}

export { ListComplimentsReceivedByUser }