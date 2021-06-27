import { getCustomRepository } from "typeorm"
import { BusinessRuleViolation } from "../errors/BusinessRuleViolation";
import { ValidationError } from "../errors/ValidationError";
import { TagsRepository } from "../repositories/TagsRepository"

class CreateTagService {
    tagsRepository: TagsRepository;

    constructor() {
        this.tagsRepository = getCustomRepository(TagsRepository);
    }

    async create(name: string) {
        await this.assertTagDoesNotExist(name);

        const newTag = this.tagsRepository.create({ name });

        await this.tagsRepository.save(newTag);

        return newTag;
    }

    async assertTagDoesNotExist(tag: string) {
        this.assertTagNameIsNotEmpty(tag);

        const tagAlreadyExists = await this.tagsRepository.findOne({ name: tag });

        if (tagAlreadyExists) {
            throw new TagAlreadyExists(tag);
        }
    }

    assertTagNameIsNotEmpty(tag: string) {
        if (!tag) {
            throw new ValidationError("Tag name must be provided.", "name");
        }
    }
}

class TagAlreadyExists extends BusinessRuleViolation {
    constructor(tag: string) {
        super(`The tag ${tag} already exists`);
    }
}

export { CreateTagService }