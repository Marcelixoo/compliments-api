import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { TagsRepository } from "../repositories/TagsRepository";

class ListTags {
    async execute() {
        const tagsRepository = getCustomRepository(TagsRepository);

        const tags = tagsRepository.find();

        return classToPlain(tags);
    }
}

export { ListTags }